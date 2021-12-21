from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
def  create_app():
    app = Flask(__name__)
    from .config import Config
    app.config.from_object(Config)
 
    from .api import api
    from .views import views
    app.register_blueprint(api,url_prefix='/api')
    app.register_blueprint(views,url_prefix='/')


    db.init_app(app)
    from .models import Users,Notes
    
    with app.app_context():
    	db.create_all()
    	db.session.commit()


    return app