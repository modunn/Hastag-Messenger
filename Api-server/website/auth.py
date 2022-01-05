from flask import (Blueprint,
                   request,
                   render_template,
                   redirect,
                   url_for,
                   jsonify
                   )
from flask_login import login_user, logout_user, login_required,current_user
from . import db
from . models import Custom, Users

auth = Blueprint('auth', __name__,template_folder='templates/auth')


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard.started'))    
    if request.method == 'POST':
        data = request.form
        username = data['username']
        password = data['password']
        user = Users.query.filter_by(user=username).first()
        if user:
            if password == user.pass_word:
                login_user(user, remember=True)
                return redirect(request.args.get('next') or url_for('dashboard.started'))

    return render_template('login.html')



@auth.route('/sign-up', methods=['GET', 'POST'])
def signup():
    data = request.args
    user = Users.query.filter_by(user=request.args['username']).first()
    if user:
        return jsonify({'msg':'tên tài khoản đã tồn tại','code':1})
    newUser = Users(
        user=request.args['username'],
        pass_word = request.args['password'],
        )
    custom = Custom(user=newUser.user)
    db.session.add(custom)
    db.session.add(newUser)
    db.session.commit()
    return jsonify({'msg':'Đăng kí thành công',
                'code':0,
                'username':request.args['username'],
                'password' :request.args['password'],
                'id':newUser.id,
                })

@auth.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
