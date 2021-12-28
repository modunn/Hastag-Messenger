#views 
from flask import Blueprint, render_template
from flask_login import current_user,login_required


views = Blueprint('views',__name__)



@views.route('/',methods=['GET','POST'])
@views.route('/home',methods=['GET','POST'])
@login_required
def home():
    return render_template('home.html')


@views.route('/card_view',methods=['GET','POST'])
@login_required
def card_view():
    return render_template('card.html')


