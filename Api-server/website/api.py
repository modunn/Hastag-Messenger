# views
import re
from flask import Blueprint, jsonify, request
import json

from . import db
from . models import Custom, Notes, Users

api = Blueprint('api', __name__)



@api.route('/infomation', methods=['GET', 'POST'])
def infomation():
    if request.method == 'POST':
        res = json.loads(request.data)
        user = Users.query.filter_by(user=res['user']).first()
        print(res)
        if not user:
            user = Users(
                user=res.get('user'),
                pass_word='123456',
                name=res.get('user'))
            custom = Custom(user=user.user)
            db.session.add(user)
            db.session.add(custom)
            db.session.commit()

        custom = Custom.query.filter_by(user=user.user).first().serialize()
        note = Notes.query.filter_by(user=user.user).all()
        cols = ['guest_id', 'text_note', 'color']
        data = [{col: getattr(d, col) for col in cols} for d in note]

        notes = {}
        for i in data:
            notes[i['guest_id']] = {
                'text': i['text_note'],
                'color': i['color']
            }
        response = {'infomation':
                        {'user_id':user.user,
                        'custom_notes':custom,
                        'notes':notes,
                        }
        }
        return jsonify(response)
    return 'hello world'



@api.route('/edit', methods=['GET', 'POST'])
def edit():
    if request.method == 'POST':
        res = json.loads(request.data)
        note = Notes.query.filter_by(guest_id=res['id']).first()
        if note:
            note.text_note = res['text']
            note.color = res['color']
            note.user = res['user_id']
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

        return jsonify({'msg': msg,
                        'status': 0,
                        'user_id': res['user_id'],
                        'tag_id': note.id,
                        'notes': res['text'],
                        'bg_color': res['color']})


@api.route('/remove', methods=['GET', 'POST'])
def remove():
    if request.method == 'POST':
        res = json.loads(request.data)
        note = Notes.query.filter_by(user=res['user_id']).filter_by(
            guest_id=res['id']).first()
        if note:
            db.session.delete(note)
            db.session.commit()
            return jsonify({
                'msg': 'remove note succesfully',
                'status': 0,
                'note_id': note.id,
                'note_text': note.text_note,
                'background_color': note.color,
                'user_id': res['user_id'],
                'guest_id': res['id']
            })
        else:
            return jsonify({
                'msg': "Can't delete note",
                'status': 1
            })


@api.route('/custom', methods=['GET', 'POST'])
def custom():
    if request.method =='POST':
        res = json.loads(request.data)
        user = res.get('user')
        color_default = res.get('color_default')
        length =  res.get('length')


        custom = Custom.query.filter_by(user=user).first()
        custom.color_default = color_default
        custom.length = length
        db.session.commit()

        return {'msg':'edit succesfully',
                'code':0,
                'user_id':user,
                'custom_id':custom.id
                }
    return 'Hello world'


@api.route('/update-name', methods=['GET', 'POST'])
def update_name():
    if request.method =='POST':
        res = json.loads(request.data)
        user = res.get('user')
        name = res.get('name')
        user_data = Users.query.filter_by(user=user).first()
        user_data.name = name
        db.session.commit()

        return {'msg':'edit name succesfully',
                'code':0,
                'user_id':user,
                'name':name
                }
    return 'Hello world'

@api.route('/update-password', methods=['GET', 'POST'])
def update_password():
    if request.method =='POST':
        res = json.loads(request.data)
        user = res.get('user')
        password = res.get('password')
        new_password = res.get('new_password')
        user_data = Users.query.filter_by(user=user).first()
        
        if password !=user_data.pass_word :
                
            return {'msg':'Mật khẩu cũ không chính xác',
                    'code':1,
                    }

        user_data.pass_word = new_password
        db.session.commit()

        return {'msg':'edit password succesfully',
                'code':0,
                }
    return 'Hello world'
