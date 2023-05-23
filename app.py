from flask import Flask
from server.routes import server_bp


def create_app():
    app = Flask(__name__)

    app.register_blueprint(server_bp)

    return app