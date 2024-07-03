from flask import Flask, request, jsonify, redirect, url_for, send_file
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import bcrypt
from dotenv import load_dotenv
from sqlalchemy.sql import text
import csv
import io

load_dotenv()  # Load .env file

app = Flask(__name__)
CORS(app)

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL')

# Configuration for SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Secret key for signing tokens
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

mail = Mail(app)
db = SQLAlchemy(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# Log to ensure database connection
try:
    with app.app_context():
        db.session.execute(text('SELECT 1'))
    print("Database connection successful")
except Exception as e:
    print(f"Database connection failed: {e}")

# User model
class User(db.Model):
    __tablename__ = 'usuario'
    id = db.Column('id_usuario', db.Integer, primary_key=True)
    codigo_usuario = db.Column(db.Integer, unique=True)
    nome_completo = db.Column(db.String(255))
    email = db.Column(db.String(50), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    id_perfil = db.Column(db.Integer)
    
@app.route('/generate-csv', methods=['GET'])
def generate_csv():
    try:
        output = io.StringIO()
        writer = csv.writer(output, quoting=csv.QUOTE_NONNUMERIC)
        
        queries = {
            'Usuários': '''
                SELECT 
                    u.id_usuario, u.codigo_usuario, u.nome_completo, u.email, p.nome_perfil, p.descricao AS descricao_perfil
                FROM 
                    Usuario u
                LEFT JOIN 
                    Perfil p ON u.id_perfil = p.id_perfil;
            ''',
            'Perfis': '''
                SELECT 
                    id_perfil, nome_perfil, descricao 
                FROM 
                    Perfil;
            ''',
            'Módulos': '''
                SELECT 
                    id_modulo, codigo_modulo, nome_modulo, descricao 
                FROM 
                    Modulo;
            ''',
            'Funções': '''
                SELECT 
                    id_funcao, codigo_funcao, nome_funcao, descricao 
                FROM 
                    Funcao;
            ''',
            'Transações': '''
                SELECT 
                    id_transacao, codigo_transacao, nome_transacao, descricao 
                FROM 
                    Transacao;
            ''',
            'Associações entre módulos funções e transações': '''
                SELECT 
                    m.id_modulo, m.codigo_modulo, m.nome_modulo, m.descricao AS descricao_modulo,
                    f.id_funcao, f.codigo_funcao, f.nome_funcao, f.descricao AS descricao_funcao,
                    NULL AS id_transacao, NULL AS codigo_transacao, NULL AS nome_transacao, NULL AS descricao_transacao
                FROM 
                    Modulo m
                LEFT JOIN 
                    ModuloFuncao mf ON m.id_modulo = mf.id_modulo
                LEFT JOIN 
                    Funcao f ON mf.id_funcao = f.id_funcao

                UNION ALL

                SELECT 
                    m.id_modulo, m.codigo_modulo, m.nome_modulo, m.descricao AS descricao_modulo,
                    NULL AS id_funcao, NULL AS codigo_funcao, NULL AS nome_funcao, NULL AS descricao_funcao,
                    t.id_transacao, t.codigo_transacao, t.nome_transacao, t.descricao AS descricao_transacao
                FROM 
                    Modulo m
                LEFT JOIN 
                    ModuloTransacao mt ON m.id_modulo = mt.id_modulo
                LEFT JOIN 
                    Transacao t ON mt.id_transacao = t.id_transacao;
            '''
        }

        sections = ['Usuários', 'Perfis', 'Módulos', 'Funções', 'Transações', 'Associações entre módulos funções e transações']
        
        for section in sections:
            query = queries[section]
            print(f"Executing query for table: {section}")
            writer.writerow([f'{section}'])
            try:
                result = db.session.execute(text(query))
                columns = result.keys()
                writer.writerow(columns) 

                rows = result.fetchall()
                if not rows:
                    print(f"No data found for table: {section}")
                else:
                    print(f"Found data for table: {section}, writing to CSV")
                    for row in rows:
                        writer.writerow([x if x is not None else '----------------' for x in row])
                writer.writerow([])  
            except Exception as query_error:
                print(f"Error executing query for table {section}: {query_error}")

        output.seek(0)
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8')),
            mimetype='text/csv',
            download_name='database_contents.csv',
            as_attachment=True
        )
    
    except Exception as e:
        print(f"Error in generate_csv: {e}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/send-recovery-email', methods=['POST'])
def send_recovery_email():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email address is required'}), 400

    # Check if the email exists in the database
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Email address not found'}), 404

    # Generate a unique token
    token = serializer.dumps(email, salt='password-recovery-salt')

    # Construct the password recovery URL
    recovery_url = url_for('recover_password', token=token, _external=True)

    # Create a password recovery email message
    msg = Message('Redefinição de senha',
                  recipients=[email])
    msg.body = f'Clique o link ao lado para redefinir sua senha: {recovery_url}'

    try:
        mail.send(msg)
        return jsonify({'message': 'E-mail de recuperação enviado com sucesso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recover-password/<token>', methods=['GET', 'PUT'])
def recover_password(token):
    try:
        email = serializer.loads(token, salt='password-recovery-salt', max_age=3600)
        if request.method == 'GET':
            return redirect(f'http://localhost:5173/recover-password/{token}')
        
        if request.method == 'PUT':
            user = User.query.filter_by(email=email).first()
            if user:
                data = request.json
                new_password = data.get('password')
                if not new_password:
                    return jsonify({'error': 'Password is required'}), 400

                hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
                user.senha = hashed_password.decode('utf-8')
                db.session.commit()
                return jsonify({'message': ''}), 200
            else:
                return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': 'The token is invalid or has expired'}), 400

@app.route('/login-recovery', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.checkpw(password.encode('utf-8'), user.senha.encode('utf-8')):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)