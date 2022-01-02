

class Config(object):
    # SQLALCHEMY_DATABASE_URI         = "postgresql://lnxjujizfbngmn:612dad9cbe7462b258a015d3d473a75971d1f2dc290e6fec085c0e086ff03d0e@ec2-3-218-158-102.compute-1.amazonaws.com:5432/d81ct5kdcrvcsk"
    SQLALCHEMY_DATABASE_URI         = 'sqlite:///database.sqlite'
    SECRET_KEY                      = '8888'
    SQLALCHEMY_TRACK_MODIFICATIONS  = False
    EXECUTOR_PROPAGATE_EXCEPTIONS   = True
    JSON_AS_ASCII                   = False

    