import React,{useState, useContext} from 'react'
import $ from 'jquery'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import firebase from '../../config/fbConfig'
import { HelmetContext } from '../../context/HelmetContext';
import HelmetData from './HelmetData';
import { Redirect } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

const CreateGroup = () => {
    const { helmet, dispatch } = useContext(HelmetContext)
    const { currentUser, userProfile } = useContext(AuthContext)
    const [personGroup, setPersonGroup] = useState(
        {
            detected:[],
            groupName: null,
            groupID: null,
            
        }
    )

    const handleChange = (e) => {
        setPersonGroup({
            ...personGroup,
            [e.target.id]: e.target.value
        })
        // console.log(personGroup)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Feature not Available")
        // $.ajax({
        //     url: "https://detectrecogdemo.cognitiveservices.azure.com/face/v1.0/persongroups/"+personGroup.groupID,
        //     beforeSend: function(xhrObj){
        //         // Request headers
        //         xhrObj.setRequestHeader("Content-Type","application/json");
        //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d48fdff6e7af4dfd86fbb757c44c6884");
        //     },
        //     type: "PUT",
        //     // Request body
        //     data: JSON.stringify( {
        //         "name": personGroup.groupName,
        //     }),
        // })
        // .done(function(data) {
        //     // console.log(data)
        //     // console.log(data)
        //     firebase
        //     .firestore()
        //     .collection('helmets')
        //     .add({
        //         groupID: personGroup.groupID,
        //         groupName: personGroup.groupName
        //     })
        //     .catch((err) => {
        //         dispatch({ type: 'ADD_USER_ERROR', err })
        //     })
        //     // console.log(helmet)
        //     alert("Created");
        // })
        // .fail(function(err) {
        //     console.log(err);
        //     alert("Error.Please try again");
            
        // });
    }
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) {
            return ( 
                
                <Container style={{ marginBottom: '40px', marginTop: '40px', color: 'black' }}>
                    <Row>
                        
                        <Col lg={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Add Helmet</Card.Title>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="groupName">
                                            <Form.Label>Helmet Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Group Name" onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="groupID">
                                            <Form.Label>Helmet ID</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Group ID" onChange={handleChange} />
                                            <Form.Text className="text-muted">
                                                "Create a new person group with specified personGroupId, name, user-provided userData and recognitionModel.
                                                    A person group is a container holding the uploaded person data, including face recognition features.
                                                    After creation, use PersonGroup Person - Create to add persons into the group, and then call PersonGroup - Train to get this group ready for Face - Identify."
                                            </Form.Text>
                                        </Form.Group>
                                        <Button variant="outline-primary" type="submit" block disabled>
                                            Create
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={9}>
                            <HelmetData/>
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
 
export default CreateGroup;