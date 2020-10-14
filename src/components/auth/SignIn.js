import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import firebase from '../../config/fbConfig'
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router-dom";

const SignIn = ({setLoginModal,history}) => {
     
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    
    const { currentUser,userProfile } = useContext(AuthContext)
    console.log(currentUser);
    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(
            user.email,
            user.password
        ).then(() => {
            
            // setTimeout(() => {
            //     history.push('/users')    
            // },2000)
            setLoginModal(false)
            console.log(currentUser);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
       
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg={12} style={{ borderRadius: '20px' }}>
                    <h5>Sign In</h5>
                    <br />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
                            <Form.Text>
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                        </Form.Group>
                        {/* <Form.Group>
                    <NavLink className="grey-text" to="/signup">Create Account</NavLink>
                </Form.Group> */}
                        <Button className="green-color" variant="info" type="submit" style={{ width: '100%' }}>Sign In</Button>
                    </Form>
                </Col>
            </Row>

        </Container>
    );

}

export default SignIn;