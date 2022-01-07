from flask import Blueprint, render_template,redirect,url_for
from flask_login import login_required,current_user
from . import db 
from .models import Custom,Users,Notes

dashboard = Blueprint('dashboard',__name__,template_folder='templates/dashboard')



@dashboard.route('/')
@login_required
def dash():
    return redirect(url_for('dashboard.started'))


@dashboard.route('/get-started')
@login_required
def started():
    return render_template('get-started.html')


@dashboard.route('/custom-note')
@login_required
def custom_note():
    return render_template('custom-note.html')

@dashboard.route('/list-note')
@login_required
def list_note():
    note = Notes.query.filter_by(user=current_user.user).all()
    cols = ['id','guest_name','guest_id', 'text_note', 'color','address','zalo','telegram','tel']
    data = [{col: getattr(d, col) for col in cols} for d in note]    
    return render_template('list-note.html',data=data)

@dashboard.route('/api')
@login_required
def api():
    return render_template('api.html')

@dashboard.route('/event')
@login_required
def event():
    return render_template('event.html')

@dashboard.route('/billing')
@login_required
def billing():
    return render_template('billing.html')

@dashboard.route('/setting')
@login_required
def setting():

    return render_template('setting.html')