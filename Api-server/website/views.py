#views 
from flask import Blueprint

views = Blueprint('views',__name__)
@views.route('/',methods=['GET','POST'])
def index():
    return "<h1 style='text-align:center;font-size:100px;color:rgb(255,0,0)'>Hello world</h1>"