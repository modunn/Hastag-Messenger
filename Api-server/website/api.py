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
            note.user       = res['user_id']
            db.session.commit()
            msg = 'edit note succesfully'
        else:
            new_note = Notes(guest_id=res['id'],
                            color=res['color'],
                            text_note=res['text'],
                            user=res['user_id'])
            db.session.add(new_note)
            db.session.commit()
            msg = 'create note succesfully'

        return jsonify({'msg':msg,
                        'status':0,
                        'user_id':res['user_id'],
                        'tag_id':note.id,
                        'notes':res['text'],
                        'bg_color':res['color']})

@api.route('/remove',methods=['GET','POST'])
def remove():
    if request.method =='POST':
        res = json.loads(request.data)
        note = Notes.query.filter_by(user=res['user_id']).filter_by(guest_id=res['id']).first()
        if note :
            db.session.delete(note)
            db.session.commit()
            return jsonify({
                        'msg':'remove note succesfully',
                        'status':0,
                        'note_id':note.id,
                        'note_text': note.text_note,
                        'background_color':note.color,
                        'user_id' : res['user_id'],
                        'guest_id':res['id']
                        })
        else:
            return jsonify({
            'msg':"Can't delete note",
            'status':1
            })  





@api.route('/user',methods=['GET','POST'])
def getuser():
    user = Users.query.all()

    cols =['user','id']
    data = [{col: getattr(d, col) for col in cols} for d in user]
    print(data)
    return jsonify(data=data)