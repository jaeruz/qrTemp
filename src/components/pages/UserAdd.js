import React, { useState } from 'react'
import { useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import firebase from '../../config/fbConfig'

const UserAdd = ({ setAddState }) => {
    const { dispatch } = useContext(UserContext)
    const [user, setUser] = useState({
                    temps:[],
                    lastTemp: Math.floor(Math.random() * (40-25))+25,
                    date: new Date()
                })
    const handleSubmit = (e) => {
        e.preventDefault();
        firebase
            .firestore()
            .collection('employees')
            .add({
                user
            })
            .catch((err) => {
                dispatch({ type: 'ADD_USER_ERROR', err })
            })


        setAddState(false)
        // console.log(user)

    }
    const handleChange = (e) => {
        // console.log(user)
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    return (
        <Container style={{ color: 'black' }}>
            <Row className="justify-content-md-center">
                <Col lg={12} style={{ padding: '30px', borderRadius: '20px' }}>
                    <h5 className="dash-title">Add Employee</h5>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" onChange={handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                        </Form.Group>
                        <Button className="form-but" variant="primary" type="submit">Add</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UserAdd;