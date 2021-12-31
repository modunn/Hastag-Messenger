#views 
from flask import Blueprint, render_template,redirect ,url_for
from flask_login import current_user,login_required


views = Blueprint('views',__name__)



@views.route('/',methods=['GET','POST'])
def index():
    return redirect(url_for('views.product',user=current_user))


@views.route('/product',methods=['GET','POST'])
def product():
    return render_template('product.html')

@views.route('/pricing',methods=['GET','POST'])
def pricing():
    return render_template('pricing.html')
    
@views.route('/docs',methods=['GET','POST'])
def docs():
    return render_template('docs.html')


@views.route('/download',methods=['GET','POST'])
@login_required
def download():
    return render_template('download.html')





