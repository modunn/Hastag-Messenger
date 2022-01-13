# views
import re
from flask import Blueprint, jsonify, request
import os,requests,base64

from flask_login import logout_user,login_required
from flask_login.utils import login_user
from . import db, imgurl_to_base64
from flask_login import current_user
from . models import Avartar, Styles, Contacts, Users,DEFAULT_IMG_DATA
import base64

api = Blueprint('api', __name__)





@api.route('/facebook-connect', methods=['GET', 'POST'])
def connect():
    if request.method == 'POST':

        res = request.get_json()


        user = Users.query.filter_by(facebook_id=res['facebook_id']).first()
        if not user:
            user = Users(
                username=res.get('facebook_id'),
                name=res.get('name'),
                facebook_id = res.get('facebook_id')
            )

            styles = Styles(username=user.username)
            avt    = Avartar(
                username=user.username,
                image_base64= imgurl_to_base64(res.get('avartar_url')),
                image_name =user.username+"_avartar"
            )
            db.session.add(user)
            db.session.add(styles)
            db.session.add(avt)
            db.session.commit()



        # get all contact 
        contacts = Contacts.query.filter_by(username=user.username).all()

        # create json data 
        cols = ['id','name','address', 'phone', 'note','color','zalo','telegram','facebook','image']
        data = [{col: getattr(d, col) for col in cols} for d in contacts]
        contacts_data = {}

        # create json data key = facebook_id contact
        for value in data:
            if value['facebook'] !="":
                contacts_data[value['facebook']] = {
                    'id': value['id'],
                    'name': value['name'],
                    'address': value['address'],
                    'phone' :value['phone'],
                    'zalo': value['zalo'],
                    'telegram': value['telegram'],
                    'facebook': value['facebook'],
                    'note': value['note'],
                    'color': value['color'],
                    'image' : value['image']
                }

        # get style  
        styles = Styles.query.filter_by(username=user.username).first().serialize()

        # return full infomation
        response = {'user_id':user.id,
                    'name':user.name,
                    'styles':styles,
                    'contacts':contacts_data,
                }
        
        return jsonify(facebook_data=response)
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """

@api.route('/update-name', methods=['GET', 'POST'])
def update_name():
    if request.method =='POST':
        res = request.get_json()
        username = res.get('username')
        name = res.get('name')
        user_data = Users.query.filter_by(username=username).first()
        user_data.name = name
        db.session.commit()

        return {'msg':'edit name succesfully',
                'code':0,
                'username':user_data.username,
                'name':user_data.name
                }
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """

@api.route('/update-password', methods=['GET', 'POST'])
def update_password():
    if request.method =='POST':
        res = request.get_json()
        username = res.get('username')
        password = res.get('password')
        new_password = res.get('new_password')
        user_data = Users.query.filter_by(username=username).first()
        
        if password !=user_data.pass_word :
                
            return {'msg':'Mật khẩu cũ không chính xác',
                    'code':1,
                    }

        user_data.pass_word = new_password
        db.session.commit()

        return {'msg':'edit password succesfully',
                'code':0,
                }
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """


def render_picture(data):
    render_pic = base64.b64encode(data).decode('ascii') 
    return "data:image/png;base64,"+ render_pic

@api.route('/upload',methods=['GET','POST'])
def upload():
    if request.method =='POST':
        file = request.files.get('files')
        image_name = file.filename
        content_type = file.content_type
        image_data = file.read()
        avt  = Avartar.query.filter_by(username=current_user.username).first()
        if avt:
            avt.image_name = image_name
            avt.content_type = content_type
            avt.image_base64 = render_picture(image_data)
            avt.image_data = image_data
            avt.username = current_user.username
            db.session.commit()
            return jsonify({
                'image_base64':avt.image_base64,
                'msg':'Upload succesfully',
                'code':0,
                'id':avt.id,
                'user':avt.username,
                'image_name':avt.image_name,
                'content_type':avt.content_type
                })
        avt = Avartar(
            image_name=image_name,
            content_type=content_type,
            image_base64=render_picture(image_data),
            image_data=image_data,
            username =current_user.username
            )
        db.session.add(avt)
        db.session.commit()
        return jsonify({
                'image_base64':avt.image_base64,
                'msg':'Upload succesfully',
                'code':0,
                'id':avt.id,
                'username':avt.username,
                'image_name':avt.image_name,
                'content_type':avt.content_type
                })
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """


@api.route('/add-contact',methods=['GET','POST'])
def add_contact():
    if request.method == "POST":
        image_data = request.files.get('image',False)
        if image_data:
            image = render_picture(image_data.read())
        else : 
            image = DEFAULT_IMG_DATA

        data = request.form
        name = data.get("name")
        note = data.get("note")
        if not note:
            note = "Null"
        address = data.get("address")
        phone = data.get("phone")
        facebook = data.get("facebook")
        zalo =   data.get("zalo")
        telegram = data.get("telegram")
        color = data.get("color")


        new_contact = Contacts(
            name = name,
            note = note,
            address = address,
            phone = phone,
            facebook = facebook,
            zalo = zalo,
            telegram = telegram,
            color    = color,
            image = image,
            username = current_user.username
        )
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({
                "user_id"    : current_user.id,
                "id"         : new_contact.id,
                "username"   : current_user.username,
                "name"       : name,
                "note"       : note,      
                "address"    : address,
                "phone"      : phone,
                "facebook"   : facebook,
                "zalo"       : zalo,
                "telegram"   : telegram,
                "color"      : color,
                "image"      : image, 
                "msg"        :"Thêm liên hệ thành công",
                "code"       :0
                })

    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """


@api.route('/edit-contact',methods=['GET','POST'])
def edit_contact():
    if request.method == "POST":
        image_data = request.files.get('image',False)


        data = request.form
        id = data.get('id')

        contact = Contacts.query.filter_by(id=id).first()
        if contact :
            contact.name = data.get("name")
            contact.note = data.get("note")
            contact.address = data.get("address")
            contact.phone = data.get("phone")
            contact.facebook = data.get("facebook")
            contact.zalo =   data.get("zalo")
            contact.telegram = data.get("telegram")
            contact.color = data.get("color")
            if image_data:
                contact.image = render_picture(image_data.read())
            db.session.commit()

        return jsonify({
                "user_id"    : current_user.id,
                "contact_id" : contact.id,
                "username"   : current_user.username,
                "name"       : contact.name,
                "note"       : contact.note,      
                "address"    : contact.address,
                "phone"      : contact.phone,
                "facebook"   : contact.facebook,
                "zalo"       : contact.zalo,
                "telegram"   : contact.telegram,
                "color"      : contact.color,
                "image"      : contact.image, 
                "msg"        :"Sửa liên hệ thành công",
                "code"       :0
                })
        
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """



@api.route('/edit-style', methods=['GET', 'POST'])
def edit_style():
    if request.method =='POST':
        res = request.get_json()
        username = res.get('username')
        color_default = res.get('color_default')
        opacity =  res.get('opacity')


        styles = Styles.query.filter_by(username=username).first()
        styles.color_default = color_default
        styles.opacity = opacity
        db.session.commit()

        return {'msg':'edit succesfully',
                'code':0,
                'username':username,
                'styles_id':styles.id
                }
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """

@api.route("/remove-contact",methods=['GET','POST'])
def remove_contact():
    if request.method =="POST":
        res = request.get_json()
        id = res.get('id')
        contact = Contacts.query.filter_by(id=id).first()
        if contact:
            db.session.delete(contact)
            db.session.commit()
            return jsonify({
                    "msg":"Xóa thành công",
                    "code":0,
                    "contact_id" : contact.id,
                    "name"       : contact.name,
                    "note"       : contact.note,      
                    "address"    : contact.address,
                    "phone"      : contact.phone,
                    "facebook"   : contact.facebook,
                    "zalo"       : contact.zalo,
                    "telegram"   : contact.telegram,
                    "color"      : contact.color,
                    "image"      : contact.image, 
                    })
        return jsonify({"msg":"Có lỗi xảy ra","id":id,"code":1})
        
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """

@api.route("/remove-user",methods=['GET','POST'])
@login_required
def remove_user():
    if request.method =="POST":
        res = request.get_json()

        username = res.get('username')
        user = Users.query.filter_by(username=username).first()
        if user:
            delete_contact = Contacts.__table__.delete().where(Contacts.username == username)
            delete_style   = Styles.__table__.delete().where(Styles.username == username)
            delete_avt   = Avartar.__table__.delete().where(Avartar.username == username)

            db.session.execute(delete_contact)
            db.session.execute(delete_style)
            db.session.execute(delete_avt)
            db.session.delete(user)

            db.session.commit()
            logout_user()
            return jsonify({"msg":"Xóa thành công","username":username,"code":0,"user_id":user.id})
        return jsonify({"msg":"Có lỗi xảy ra","username":username,"code":1,"user_id":user.id})   
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """

@api.route("/edit-facebook",methods=['GET','POST'])
def edit_facebook():
    if request.method =="POST":
        data = request.get_json()
        user = Users.query.filter_by(username=data['username']).first()
        if user :
            user.facebook_id = data['facebook_id']
            db.session.commit()
            return jsonify({"msg":'connect Facebook thành công',"code":0,"username":user.username})
        return jsonify({"msg":'connect Facebook thất bại',"code":1,"username":data['username']})
    
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """

@api.route("/handle-note-facebook",methods=['GET','POST'])
def handle_note_facebook():
    if request.method =="POST":
        data = request.get_json()

        contact = Contacts.query.filter_by(username=data['facebook_id'],facebook=data['contact_id']).first()
        if "data:image/png;base64" not in data['image']:
            image = imgurl_to_base64(data['image'])
        else:
            image = data['image']
        if contact :
            contact.name = data['contact_name']
            contact.note = data['note']
            contact.color = data['color']
            contact.facebook = data['contact_id']
            contact.image = image
            db.session.commit()
        else :
            contact = Contacts(
                name = data['contact_name'],
                note = data['note'],
                color = data['color'],
                image = image,
                facebook = data['contact_id'],
                username=data['facebook_id']
                )
            db.session.add(contact)
            db.session.commit()

        return jsonify({
                "contact_id" : contact.id,
                "username"   : data['facebook_id'],
                "name"       : contact.name,
                "note"       : contact.note,      
                "address"    : contact.address,
                "phone"      : contact.phone,
                "facebook"   : contact.facebook,
                "zalo"       : contact.zalo,
                "telegram"   : contact.telegram,
                "color"      : contact.color,
                "image"      : contact.image, 
                "msg"        :"Sửa liên hệ thành công",
                "code"       :0
                })
    return """
    <div style="text-align:center;">
    <h1 style='margin:200px auto;color:red;'>Bạn không có quyền truy cập trang web này</h1>
    <a href="/dashboard/get-started">quay về trang chủ</a>
    </div>
    """

