#views 
from flask import Blueprint, render_template,redirect ,url_for
from flask_login import current_user,login_required
from .models import Avartar,Users,Contacts,Styles

views = Blueprint('views',__name__,template_folder='templates/views')



@views.route('/',methods=['GET','POST'])
@views.route('/home',methods=['GET','POST'])
def home():
    return render_template('home.html',user=current_user)


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

@views.route('/images/<id>',methods=['GET','POST'])
def avartar(id):
    avt = Avartar.query.filter_by(id=id).first()
    if not avt :
        return "Không thể truy cập đường dẫn này",400
    return 'data:image/png;base64,'+ avt.image_base64