import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './SignUp.css'

function SignUp() {
    const [campers, setCampers] = useState([])
    const [activities, setActivities] = useState([])
    const [camper_id, setCamper_id] = useState('');
    const [activity_id, setActivity_id] = useState('');
    const [time, setTime] = useState('');
    
    useEffect(() =>{
        fetch('http://127.0.0.1:5555/campers')
        .then(res => res.json())
        .then(data => {
            setCampers(data)
        })
        .catch(error=> {console.error("Error fetching Campers", error)})
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:5555/activities')
        .then(res => res.json())
        .then(data => {
            
            setActivities(data)
        })
        .catch(err => {console.error('Error while fetching Activities', err)})
    }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const newSignup = {
      camper_id: parseInt(camper_id),
      activity_id: parseInt(activity_id),
      time: parseInt(time),
    }

    fetch('http://127.0.0.1:5555/signups', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json' 
        },
      body: JSON.stringify(newSignup)
    })
    .then(res => res.json())
    .then(data => {
      setCamper_id('')
      setActivity_id('')
      setTime('')
    })
    .catch(err => console.error("Error signing up camper:", err));
  }


  return (
    <div>
            <h3>Sign Up Camper to Activity</h3>
       <Form onSubmit={handleSubmit} className='form2'>
        <Form.Group className="mb-3">
          <Form.Label>Select Camper</Form.Label>
          <Form.Select value={camper_id} onChange={e => setCamper_id(e.target.value)} required>
            <option value="">Select a Camper</option>
            {campers.map(camper => (
              <option key={camper.camper_id} value={camper.camper_id}>
                {camper.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Activity</Form.Label>
          <Form.Select value={activity_id} onChange={e => setActivity_id(e.target.value)} required>
            <option value="">Select an Activity</option>
            {activities.map(activity => (
              <option key={activity.activity_id} value={activity.activity_id}>
                {activity.activity_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time (24Hr clock)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="23"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">SignUp a Camper</Button>
      </Form>


        
    
    </div>
  )
}

export default SignUp