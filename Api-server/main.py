from website import create_app 
from flask_migrate import Migrate



app,db,socketio = create_app()
migrate = Migrate(app, db) #flask db init , flask db migrate -m "msg" , flask db upgrade


if __name__ =="__main__":
   # from flask_migrate import Migrate

   socketio.run(app,host="172.18.9.28",port=8888,debug=True)
    
    # app.run(debug=True)


