from . import socketio
from flask_socketio import send,emit,join_room
from flask import session
from flask_login import current_user
from .models import Users,Contacts



@socketio.on('joined')
def joined(msg):
	print(msg)
	room = msg.get("room")
	name = msg.get("name")
	join_room(room)
	emit("status",{"msg":f'{name} đã tham gia phòng'},room=room)


@socketio.on('message')
def message(message):
	print(message)
	room = message.get('room')
	emit("message",message,room=room)