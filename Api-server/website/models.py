from . import db
from flask_login import UserMixin
 

class Notes(db.Model):
    id              = db.Column(db.Integer,primary_key=True)
    guest_id        = db.Column(db.String,unique=True)
    text_note       = db.Column(db.String)
    color           = db.Column(db.String)
    user            = db.Column(db.String,db.ForeignKey('users.user'))

    def serialize(self):
        return {
            'id' : self.id,
            'guest_id' :self.guest_id,
            'note' : self.text_note,
            'color' : self.color,
            'user'  : self.user
        }
class Custom(db.Model):
    id              = db.Column(db.Integer,primary_key=True)

    color_default   = db.Column(db.JSON,default=['#ab68ca', '#3a58f0', '#d62f45', '#2ebf5e', '#fcba03'])
    length          = db.Column(db.String,default='80')
    user            = db.Column(db.String,db.ForeignKey('users.user')) 

    def serialize(self):
        return {
            'id' : self.id,
            'color_default' :self.color_default,
            'length' : self.length,
            'user'  : self.user
        }

class Users(db.Model,UserMixin):
	id          = db.Column(db.Integer(), primary_key=True)
	user        = db.Column(db.String,unique=True)
	name        = db.Column(db.String)
	pass_word   = db.Column(db.String)
	notes       = db.relationship('Notes',backref='users',lazy='dynamic')
	custom_note = db.relationship('Custom',backref='users')
 
	def __str__(self):
		return str(self.id)

