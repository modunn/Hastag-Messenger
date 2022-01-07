# views
from flask import Blueprint, jsonify, request
import os
from . import db
from flask_login import current_user
from . models import Avartar, Custom, Notes, Users
import base64
api = Blueprint('api', __name__)
UPLOAD_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)),'/uploads/avartar')


@api.route('/infomation', methods=['GET', 'POST'])
def infomation():
    if request.method == 'POST':
        res = request.get_json()
        user = Users.query.filter_by(user=res['user']).first()
        print(res)
        if not user:
            user = Users(
                user=res.get('user'),
                name=res.get('user'))
            custom = Custom(user=user.user)
            avt    = Avartar(user=user.user)
            db.session.add(user)
            db.session.add(custom)
            db.session.add(avt)
            db.session.commit()


        custom = Custom.query.filter_by(user=user.user).first().serialize()
        note = Notes.query.filter_by(user=user.user).all()
        cols = ['id','guest_name','guest_id', 'text_note', 'color','address','zalo','telegram','tel']
        data = [{col: getattr(d, col) for col in cols} for d in note]
        print(custom)
        notes = {}
        for i in data:
            notes[i['guest_id']] = {
                'id': i['id'],
                'name': i['guest_name'],
                'address': i['address'],
                'zalo': i['zalo'],
                'telegram': i['telegram'],
                'tel': i['tel'],
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
        res = request.get_json()
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
        res = request.get_json()
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
        res = request.get_json()
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
        res = request.get_json()
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
        res = request.get_json()
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


def render_picture(data):

    render_pic = base64.b64encode(data).decode('ascii') 
    return render_pic

@api.route('/upload',methods=['GET','POST'])
def upload():
    if request.method =='POST':
        file = request.files.get('files')
        image_name = file.filename
        content_type = file.content_type
        image_data = file.read()
        avt  = Avartar.query.filter_by(user=current_user.user).first()
        if avt:
            avt.image_name     = image_name
            avt.content_type  = content_type
            avt.image_base64  = render_picture(image_data)
            avt.image_data     = image_data
            avt.user           = current_user.user
            db.session.commit()
            return jsonify({
                'image_base64':avt.image_base64,
                'msg':'Upload succesfully',
                'code':0,
                'id':avt.id,
                'user':avt.user,
                'image_name':avt.image_name,
                'content_type':avt.content_type
                })
        avt = Avartar(
            image_name=image_name,
            content_type=content_type,
            image_base64=render_picture(image_data),
            image_data=image_data,
            user =current_user.user
            )
        db.session.add(avt)
        db.session.commit()
        return jsonify({
                'image_base64':avt.image_base64,
                'msg':'Upload succesfully',
                'code':0,
                'id':avt.id,
                'user':avt.user,
                'image_name':avt.image_name,
                'content_type':avt.content_type
                })

