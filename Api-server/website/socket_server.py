from . import socketio
from flask_socketio import emit,join_room



@socketio.on('joined')
def joined(msg):
	room = msg.get("room")
	name = msg.get("name")
	print({"msg":f'{name} đã tham gia phòng','room':room})
	join_room(room)
	emit("status",{"msg":f'{name} đã tham gia phòng'},room=room)


@socketio.on('message')
def message(message):
	print(message)
	room = message.get('room')
	emit("message",message,room=room)