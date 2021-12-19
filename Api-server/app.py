#app 
from website import create_app



if __name__ =='__main__':
    app = create_app()
    app.run(host='localhost',port='8888',debug=True)
    
