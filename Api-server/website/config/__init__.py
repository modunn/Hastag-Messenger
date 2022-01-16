import os

class Config(object):
    # SQLALCHEMY_DATABASE_URI         = 'sqlite:///database.sqlite'
    SQLALCHEMY_DATABASE_URI         = "postgresql://afmvhquxupwegt:8cb2f833e3e29732a81ba994be30b4cd57fae4dc0c2a3b8025fa06eeb96fe0d8@ec2-3-227-15-75.compute-1.amazonaws.com:5432/deuvmjj0t40gmv"
    ALLOWED_EXTENSIONS              = set(['png', 'jpg', 'jpeg'])
    UPLOAD_FOLDER                   = '/uploads/avartar'
    SECRET_KEY                      = "mundo8888"
    SQLALCHEMY_TRACK_MODIFICATIONS  = False
    EXECUTOR_PROPAGATE_EXCEPTIONS   = True
    JSON_AS_ASCII                   = False

    