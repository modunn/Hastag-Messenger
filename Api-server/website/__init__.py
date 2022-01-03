from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


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
    from .models import Users, Notes

    
    with app.app_context():
        db.create_all()
        db.session.commit()



    
    login_manager = LoginManager()
    login_manager.login_view ='auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return Users.query.get(int(id))


    return app
