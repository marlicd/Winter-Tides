from flask import Flask , jsonify, request
from flask_migrate import Migrate 
from models import Camper,Activities,Signup, db
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return jsonify({"message" : "Welcome to the Home Page"})

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/campers', methods=['GET'])
def get_campers():
    campers = Camper.query.all()
    output = []
    for camper in campers:
        camper_data = {
            'camper_id': camper.camper_id,
            'name': camper.name,
            'age': camper.age
        }
        output.append(camper_data)
    return jsonify(output)

@app.route('/campers', methods=["POST"])
def signup():
    data = request.get_json()
    #signup a camper
    camper = Camper(name=data['name'], age=data['age'])
    db.session.add(camper)
    db.session.commit()

    return jsonify({'message':"Camper Added Successfuly"})

@app.route('/activities', methods=['POST'])
def new_activities():
    data = request.get_json()
    #make an activity to be able to get and assign activities
    activity = Activities(activity_name = data['activity_name'])
    db.session.add(activity)
    db.session.commit()
    return jsonify({'message':"Activity Added Successfuly"})


@app.route('/activities', methods=['GET'])
def activities():
    activities = Activities.query.all()
    output = []
    for activity in activities:
        activity_data = {
            'activity_id' : activity.activity_id,
            'activity_name' : activity.activity_name
        }
        output.append(activity_data)
    return jsonify(output)

@app.route('/campers/<int:id>', methods=['GET'])
def get_campers_by_id():
    camper_by_id = Camper.query.get(id)
    data = request.get_json()
    camper.name = data.get('name', camper.name)
    camper.age = data.get('age', camper.age)

    db.session.commit()

@app.route('/signups', methods=['POST'])
def activity_signup():
    data = request.get_json()

    camper_id = data.get('camper_id')
    activity_id = data.get('activity_id')

    # Validates the existence of camper and activity
    camper = Camper.query.get(camper_id)
    activity = Activities.query.get(activity_id)

    if not camper or not activity:
        return jsonify({'error': 'Invalid camper_id or activity_id'}), 400

    # Create a sign up for the camper and activity
    new_signup = Signup(camper_id=camper_id, activity_id=activity_id)
    db.session.add(new_signup)
    db.session.commit()

    return jsonify({'message': f"Camper {camper.name} signed up for {activity.activity_name}!"})

#Delete
@app.route('/signups/<int:id>', methods=['DELETE'])
def delete_activity(id):
    activity = Activities.query.get(id)
    db.session.delete(activity)
    db.session.commit()
    return jsonify({'message':"Activity Deleted Successfuly"})



if __name__ == "__main__":
    app.run(port='5555', debug=True)