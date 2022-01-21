import os

class Config(object):
    # SQLALCHEMY_DATABASE_URI         = 'sqlite:///database.sqlite'
    SQLALCHEMY_DATABASE_URI         = "postgresql://cbgxpivzpnfmuq:00aeb490da3db5fe1d6d5db6e144ea43d3fb6c02f9d9e017c83be5b7ddc2b31d@ec2-34-205-46-149.compute-1.amazonaws.com:5432/d8pcm6084ec5k2"
    SECRET_KEY                      = "8888"
    SQLALCHEMY_TRACK_MODIFICATIONS  = False
    EXECUTOR_PROPAGATE_EXCEPTIONS   = True
    JSON_AS_ASCII                   = False
    SESSION_COOKIE_NAME             = "mundo"

    