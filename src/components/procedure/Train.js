import React,{useState,useContext} from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import $ from 'jquery'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const Train = () => {
    const [group, setGroup] = useState("alphahelm")
    const { userProfile } = useContext(AuthContext)    

    const handleSubmit = (e) => {
        e.preventDefault();
        $.ajax({
            url: "https://detectrecogdemo.cognitiveservices.azure.com/face/v1.0/persongroups/"+"alphahelm"+"/train",// + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d48fdff6e7af4dfd86fbb757c44c6884");
            },
            type: "POST",
        })
        .done(function(data) {
            alert("Success! Model Trained!");
        })
        .fail(function(err) {
            console.log(err);
            alert("ERROR! Please try Again!");
            
        });
    }

    const handleChange = (e) => {
        setGroup(e.target.value)
    }
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) {
            return ( 
                <Container style={{marginBottom:'40px', marginTop:'40px',color:'black'}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Train Helmet Model</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="group">
                                    <Form.Label>Helmet ID:</Form.Label>
                                    <Form.Control type="text" value="alphahelm" onChange={handleChange} disabled/>
                                </Form.Group>
                                <Button variant="success" type="submit">Train!</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            );
        }
    } else {
        return <Redirect to='/' />
    }
    return <div></div>
}
 
export default Train;