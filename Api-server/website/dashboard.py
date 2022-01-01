from flask import Blueprint, render_template
from . import db 
from .models import Custom,Users,Notes

dashboard = Blueprint('dashboard',__name__,template_folder='static/dashboard')

@dashboard.route('/')
def db_index():
    return render_template('')