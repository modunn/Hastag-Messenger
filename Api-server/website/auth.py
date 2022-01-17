from flask import (Blueprint,
                   request,
                   render_template,
                   redirect,
                   url_for,
                   )
from flask_login import login_user, logout_user, login_required,current_user
from . import db,oauth,imgurl_to_base64
from . models import Styles, Users,Avartar


auth = Blueprint('auth', __name__,template_folder='templates/auth')


oauth.register(
    name='facebook',
    client_id=u"212051767801881",
    client_secret=u"269b1d496a13c53269b2de9495d1a81d",
    access_token_url='https://graph.facebook.com/oauth/access_token',
    access_token_params=None,
    authorize_url='https://www.facebook.com/dialog/oauth',
    authorize_params=None,
    api_base_url='https://graph.facebook.com/',
    request_token_params={"scope": "email", "auth_type": "reauthenticate"}
)  

@auth.route('/login', methods=['GET', 'POST'])
def login():

    if current_user.is_authenticated:
        return redirect(url_for('dashboard.setting'))    
    if request.method == 'POST':
        data = request.form
        username = data['username']
        password = data['password']
        user = Users.query.filter_by(username=username).first()
        if user:
            if password == user.pass_word:
                login_user(user, remember=True)
                return redirect(request.args.get('next') or url_for('dashboard.setting'))

    return render_template('login.html')





@auth.route('/facebook')
def facebook():
    return oauth.facebook.authorize_redirect(url_for('auth.facebook_auth', _external=True))
 
@auth.route('/facebook-login')
def facebook_auth():
    token = oauth.facebook.authorize_access_token()

    resp = oauth.facebook.get(
        'https://graph.facebook.com/me?fields=id,name,gender,email,friends,picture.type(large){url}'
        )

    profile = resp.json()
    print("Facebook User ", profile)
    user = Users.query.filter_by(username=profile['id']).first()
    if not user:
        user = Users(username=profile['id'],name=profile['name'])
        image_base64 = imgurl_to_base64(profile['picture']['data']['url'])
        avt = Avartar(
            username=user.username,
            image_base64=image_base64,
            image_name =user.username+"_avartar"
            )
        db.session.add(user)
        db.session.add(Styles(username=user.username))
        db.session.add(avt)
        db.session.commit()
    login_user(user)
    
    return redirect(request.args.get('next') or url_for('dashboard.setting'))





@auth.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
