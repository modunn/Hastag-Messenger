from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from authlib.integrations.flask_client import OAuth
import base64,requests


oauth = OAuth()
oauth.register(
    name='facebook',
    client_id="212051767801881",
    client_secret="269b1d496a13c53269b2de9495d1a81d",
    access_token_url='https://graph.facebook.com/oauth/access_token',
    access_token_params=None,
    authorize_url='https://www.facebook.com/dialog/oauth',
    authorize_params=None,
    api_base_url='https://graph.facebook.com/',
    request_token_params={"scope": "email", "auth_type": "reauthenticate"}
)

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    from .config import Config
    app.config.from_object(Config)

    from .api import api
    from .views import views
    from .auth import auth
    from .dashboard import dashboard

    app.register_blueprint(api, url_prefix='/api')
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(dashboard, url_prefix='/dashboard')

    db.init_app(app)
    from .models import Users

    
    with app.app_context():
        db.create_all()
        db.session.commit()


    oauth.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view ='auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return Users.query.get(int(id))


    return app


def imgurl_to_base64(url):
    return base64.b64encode(requests.get(url).content).decode('ascii')