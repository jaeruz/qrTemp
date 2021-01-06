import React, { useState, useContext } from 'react'
import { Form, Button,Modal } from 'react-bootstrap';
import firebase from '../../config/fbConfig'
import { AuthContext } from '../../context/AuthContext';


const SignIn = ({setLoginModal,history}) => {
     
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // const { currentUser,userProfile } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById('indication').style.visibility = "visible";
        document.getElementById('indication').innerHTML="Signing in ..";
        firebase.auth().signInWithEmailAndPassword(
            user.email,
            user.password
        ).then(() => {
            setLoginModal(false)   
        }).catch((err) => {
            document.getElementById('indication').innerHTML="Login Failed";
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
        <>
        <Modal.Header closeButton>
            Sign In
        </Modal.Header>
            
               
            <Modal.Body>
                <Form onSubmit={handleSubmit} style={{margin:'30px'}}>
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
                    <Button className="green-color" variant="info" type="submit" style={{ width: '100%' }}>Sign In</Button>
                    <div width="100%">
                        <p style={{ textAlign: 'center', visibility: 'hidden' }} id='indication'>Signing in ..</p>
                    </div>
                </Form>
            </Modal.Body>

        </>
    );

}

export default SignIn;