from flask_sqlalchemy import SQLAlchemy

db  = SQLAlchemy()

class Camper(db.Model):
    __tablename__ = 'camper'
    camper_id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)

class Activities(db.Model):
    activity_id = db.Column(db.Integer, primary_key=True)
    activity_name = db.Column(db.String, nullable=False)

class Signup(db.Model):
    __tablename__ = 'signups'
    signup_id = db.Column(db.Integer, primary_key=True)
    camper_id = db.Column(db.Integer, db.ForeignKey('camper.camper_id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.activity_id'), nullable=False)