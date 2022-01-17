from flask import (Blueprint,
                   request,
                   render_template,
                   redirect,
                   url_for,
                   )
from flask_login import login_user, logout_user, login_required,current_user
from . models import  Users


auth = Blueprint('auth', __name__,template_folder='templates/auth')




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



@auth.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
