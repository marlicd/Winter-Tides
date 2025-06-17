import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './Campers.css'

function Campers() {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    const newCamper = {name, age}
    // Handling the Submit Button
    function handleSubmit(e){
        e.preventDefault()
        fetch('http://127.0.0.1:5555/campers',{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(newCamper)
        })
        .then(res => res.json())
        .then(data=>{
            setName('')
            setAge('')
        })
        .catch(err =>console.error("Error enrolling Camper", err))
    }


  return (
    <div>
        <Form  onSubmit={handleSubmit} className='form1'>
        {/* Inputing Campers name */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Campers Full Names</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter Camper's Full Names "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        {/* Inputing Campers age */}
        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Camper's Age</Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter Camper's Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        {/* Button to Enroll a camper */}
        <Button variant="primary" type="submit">Enroll Camper</Button>
        </Form>
    </div>
  )
}

export default Campers