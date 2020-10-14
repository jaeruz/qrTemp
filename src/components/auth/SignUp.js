import React, { useContext, useState } from 'react'
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom'


const SignUp = () => {

    
    const {dispatch,userProfile,currentUser} = useContext(AuthContext)
    const [user, setUser] = useState({
        isAdmin: false
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type:'SIGNUP', user})
        console.log(user)
    }
    const checkChange = (e) => {
        // console.log(document.getElementById([e.target.id]).checked)
        
        setUser({
            ...user,
            [e.target.id]: document.getElementById([e.target.id]).checked
        })
    }
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) {
            return (
                <Container className='orange-pad'>
                    <Row className="justify-content-md-center">
                        <Col lg={10} style={{ padding: '30px', borderRadius: '20px' }}>
                            <h5>Sign Up</h5>
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
                            
                                <Form.Row>
                                    <Form.Group as={Col} controlId="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" placeholder="Age" onChange={handleChange} />
                                    </Form.Group>
                                
                                </Form.Row>

                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control placeholder="1234 Main St" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="isAdmin">
                                    <Form.Check type="checkbox" label="Admin" onChange={checkChange} />
                                </Form.Group>
                                <Button className="form-but" variant="primary" type="submit">Sign Up</Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            );
        }
    } else {
        return <Redirect to='/' />
    }
    return <div></div>
}
 
export default SignUp;