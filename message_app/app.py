from flask import Flask, request, jsonify, url_for
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer
from flask_sqlalchemy import SQLAlchemy
import os
import bcrypt
from dotenv import load_dotenv
from sqlalchemy.sql import text

load_dotenv()  # Load .env file

app = Flask(__name__)

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

@app.route('/send-recovery-email', methods=['POST'])
def send_recovery_email():
    data = request.json
    email = data.get('email')
    
    if not email:
        return jsonify({'error': 'Email address is required'}), 400

    # Generate a unique token
    token = serializer.dumps(email, salt='password-recovery-salt')

    # Construct the password recovery URL
    recovery_url = url_for('recover_password', token=token, _external=True)

    # Create a password recovery email message
    msg = Message('Password Recovery',
                  recipients=[email])
    msg.body = f'Click the link to recover your password: {recovery_url}'

    try:
        mail.send(msg)
        return jsonify({'message': 'Password recovery email sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recover-password/<token>', methods=['GET', 'PUT'])
def recover_password(token):
    try:
        email = serializer.loads(token, salt='password-recovery-salt', max_age=3600)
        user = User.query.filter_by(email=email).first()

        if request.method == 'GET':
            if user:
                return jsonify({'message': f'Reset password for {email}'}), 200
            else:
                return jsonify({'error': 'User not found'}), 404

        if request.method == 'PUT':
            data = request.json
            new_password = data.get('password')
            if not new_password:
                return jsonify({'error': 'Password is required'}), 400

            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            user.senha = hashed_password.decode('utf-8')
            db.session.commit()
            return jsonify({'message': 'Password updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': 'The token is invalid or has expired'}), 400

@app.route('/login', methods=['POST'])
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
