from website import create_app ,db
from flask_migrate import Migrate
app = create_app()
migrate = Migrate(app, db) #flask db init , flask db migrate -m "msg" , flask db upgrade

if __name__ =="__main__":
   # from flask_migrate import Migrate

   app.run(host='localhost',port=8080,debug=True)
    
    # app.run(debug=True)


