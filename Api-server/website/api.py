#views 
from flask import Blueprint,jsonify,request
import json
from . import db
from . models import Notes,Users

api = Blueprint('api',__name__)

@api.route('/',methods=['GET','POST'])
def index():
    user = request.args.get('user_id')
    note = Notes.query.filter_by(user=user).all()
    cols =['guest_id','text_note','color']
    data = [{col: getattr(d, col) for col in cols} for d in note]
    return jsonify(data = data)