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
	message['nofitication'] = "Ghi chú " +message["name"] +" đã được thay đổi"
	message['msg'] = "changeNoteSocket"
	emit("change note",message,room=message['username'])


@socketio.on('notify')
def notify(msg):
	print( msg)
	emit("notify",msg, broadcast=True)
