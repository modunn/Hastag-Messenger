#views 
from flask import Blueprint,redirect

views = Blueprint('views',__name__)
@views.route('/',methods=['GET','POST'])
def index():
    return redirect('https://www.messenger.com/')