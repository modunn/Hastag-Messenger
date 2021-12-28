from website import create_app 

app = create_app()

if __name__ =="__main__":
   # from flask_migrate import Migrate
   # migrate = Migrate(app, db) #flask db init , flask db migrate -m "msg" , flask db upgrade

    app.run(host='localhost',port=8080,debug=True)
    
    # app.run(debug=True)


