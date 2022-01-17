from flask import Flask,request,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from authlib.integrations.flask_client import OAuth
import base64,requests,os
from flask_socketio import SocketIO


#khởi tạo trình login bằng social
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

#khởi tạo databsse
db = SQLAlchemy()

#khởi tạo server sockey
socketio = SocketIO(cors_allowed_origins="*", async_mode = 'gevent')

#funtion tạo app
def create_app():

    #khởi tạo flask app
    app = Flask(__name__)


    from .config import Config
    app.config.from_object(Config)


    #thiết lập đường dẫn blue print tới các nhánh khác
    from .api import api
    from .views import views
    from .auth import auth
    from .dashboard import dashboard

    app.register_blueprint(api, url_prefix='/api')
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(dashboard, url_prefix='/dashboard')


    #kết nối databse với flask app
    db.init_app(app)
    from .models import Users

    #tạo tất cả các table  trong database
    with app.app_context():
        db.create_all()
        db.session.commit()

    #Kết nối trình login bằng social với flask app
    oauth.init_app(app)


    #Tạo trình quản lí login và kết nối với flask app
    login_manager = LoginManager()
    login_manager.login_view ='auth.login'
    login_manager.init_app(app)

    #load user theo user id, quản lí đăng nhập đăng xuất
    @login_manager.user_loader
    def load_user(id):
        return Users.query.get(int(id))

    #Tạo và kết nôi server web socket với app
    from . import socket_server
    socketio.init_app(app,cors_allowed_origins="*")



    #Hàm trả về method app , db và socket io
    return app,db,socketio


def imgurl_to_base64(url):
    return "data:image/png;base64," + base64.b64encode(requests.get(url).content).decode('ascii')