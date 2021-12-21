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



@api.route('/login',methods=['POST'])
def signup():
    try:
        if request.method =='POST':
            user  = json.loads(request.data)
        response = Users.query.filter_by(user=user['user']).first()
        if response:
            return jsonify({'message':True,'code':301})
        new_user = Users(user=user['user'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message':True,'code':0})
    except Exception as e:
        print(e)
        return jsonify({'message':'Error','code':404})


@api.route('/edit',methods=['GET','POST'])
def edit():
    if request.method =='POST':
        res = json.loads(request.data)
        note = Notes.query.filter_by(guest_id=res['id']).first()
        if note :
            note.text_note  = res['text']
            note.color      = res['color']
            db.session.commit()
            return jsonify({f'msg':'edit tag succesfully'})
        print(res)
        new_note = Notes(guest_id=res['id'],color=res['color'],text_note=res['text'],user=res['user_id'])
        db.session.add(new_note)
        db.session.commit()
        return jsonify({f'msg':'create tag succesfully'})




@api.route('/user',methods=['GET','POST'])
def getuser():
    user = Users.query.all()

    cols =['user','id']
    data = [{col: getattr(d, col) for col in cols} for d in user]
    print(data)
    return jsonify(data=data)