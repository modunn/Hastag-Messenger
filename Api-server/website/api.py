#views 
from flask import Blueprint,jsonify,request
import json
from . import db
from . models import Notes,Users

api = Blueprint('api',__name__)

@api.route('/notes',methods=['GET','POST'])
def notes():
    user = request.args.get('user_id')
    note = Notes.query.filter_by(user=user).all()
    cols =['guest_id','text_note','color']
    data = [{col: getattr(d, col) for col in cols} for d in note]
    data_dict ={}
    for i in data :
        data_dict[i['guest_id']] = {
            'text' : i['text_note'],
            'color' : i['color']
            }
    return jsonify(data_dict)



@api.route('/signup',methods=['POST'])
def signup():
    try:
        if request.method =='POST':
            user  = json.loads(request.data)
        response = Users.query.filter_by(user=user['user']).first()
        if response:
            return jsonify({'message':'This account has already existed','code':301})
        new_user = Users(user=user['user'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message':'Sign up successfully','code':0})
    except:
        return jsonify({'message':'Error','code':404})