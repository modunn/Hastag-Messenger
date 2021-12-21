from . import db

 

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
        
class Users(db.Model):
	id = db.Column(db.Integer(), primary_key=True)
	user = db.Column(db.String,unique=True)
	notes    = db.relationship('Notes',backref='users')

	def __str__(self):
		return str(self.id)

