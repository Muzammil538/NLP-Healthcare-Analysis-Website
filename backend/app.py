from flask import Flask
from config import Config
from extensions import db, jwt
from flask_cors import CORS
from models import User, Query

from routes.auth_routes import auth_bp
from routes.predict_routes import predict_bp
from routes.dashboard import dashboard_bp
from routes.history_routes import history_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(history_bp)

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)