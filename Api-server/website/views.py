#views 
from flask import Blueprint, render_template
from flask_login import current_user,login_required


views = Blueprint('views',__name__)



@views.route('/',methods=['GET','POST'])
def index():
    return render_template('index.html',user=current_user)



@views.route('/product',methods=['GET','POST'])
def product():
    return render_template('product.html')


@views.route('/card_view',methods=['GET','POST'])
@login_required
def card_view():
    return render_template('card.html')


