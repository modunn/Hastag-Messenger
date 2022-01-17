from urllib import response
from . import socketio
from flask_socketio import emit,join_room,send


@socketio.on('joined')
def joined(message):
	room = message.get("room")
	name = message.get("name")
	print(name+" connected")
	join_room(room)
	emit("status",{"msg":f'{name} connected'},room=room)

@socketio.on('notechange')
def notechange(message):
	print(message['username']+" "+ message['nofitication'])
	emit("change note",message,room=message['username'])


@socketio.on('removeNote')
def removeNote(message):
	if message['code'] != 1:
		print(message['username']+" "+ message['nofitication'])
		emit("remove note",message,room=message['username'])


@socketio.on('notify')
def notify(msg):
	emit("notify",msg, broadcast=True)
