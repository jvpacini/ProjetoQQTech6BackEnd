from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from io import StringIO
import csv
import os

app = Flask(__name__)

# Configuração do banco de dados (substitua os valores conforme necessário)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Definição do modelo (substitua conforme seu esquema de banco de dados)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))
    email = db.Column(db.String(120))
    perfil = db.Column(db.String(50))

@app.route('/')
def index():
    return "API para gerar relatórios em CSV"

@app.route('/generate_report', methods=['GET'])
def generate_report():
    try:
        # Consultar dados do banco de dados
        users = User.query.all()

        # Criar CSV na memória
        si = StringIO()
        writer = csv.writer(si)
        writer.writerow(['ID', 'Nome', 'Email', 'Perfil'])

        for user in users:
            writer.writerow([user.id, user.nome, user.email, user.perfil])

        si.seek(0)

        # Retornar o arquivo CSV como resposta
        return send_file(
            si,
            mimetype='text/csv',
            as_attachment=True,
            attachment_filename='report.csv'
        )

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
