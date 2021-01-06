import React, {useState, useContext,useEffect} from 'react'
import { Container, Button,Card,Form } from 'react-bootstrap';
// import FileBase  from 'react-file-reader';
import FileBase from 'react-file-base64'
import $ from 'jquery'
import firebase from '../../config/fbConfig'
import { UserContext } from '../../context/UserContext';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const AddPerson = () => {
    const { dispatch } = useContext(UserContext)
    const { currentUser, userProfile } = useContext(AuthContext)
    const [group, setGroup] = useState([null])
    const [img, setImg] = useState([]);
    const [user, setUser] = useState({
        fname: null,
        lname: null,
        address: null,
        age: null,
        email: null,
        group: "alphahelm"
    })
    

    useEffect(() => {
        // console.log(user)
        if (user.personID) {
            firebase
            .firestore()
            .collection('persons')
            .add({
                user
            })
            .catch((err) => {
                dispatch({ type: 'ADD_USER_ERROR', err })
            })
        }
    }, [user])
    useEffect(() => {
        setUser({
            ...user,
            group:"alphahelm"
        })        
    }, [group])
 
    
    
    
    const onSelectImg = (files) => {
        let im = files.map(i=>i.base64)
        setImg(im);
        // document.getElementById('photo-length').innerHTML = files.base64.length + " items"

    }

    const handleGroup = (e) => {
        setGroup(e.target.value)
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    const makeblob =(dataURL)=> {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = decodeURIComponent(parts[1]);
                return new Blob([raw], { type: contentType });
            }
            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], { type: contentType });
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (img.length!=0) {
            if (img.length < 3 ||group == null || user.fname == null || user.lname == null || user.address == null || user.email == null) {
            alert('Complete Person Details!')
        } else {
            

            $.ajax({
                url: "https://detectrecogdemo.cognitiveservices.azure.com/face/v1.0/persongroups/" + "alphahelm" + "/persons",// + $.param(params),
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "d48fdff6e7af4dfd86fbb757c44c6884");
                },
                type: "POST",
                // Request body
                data: JSON.stringify({
                    "name": user.fname+' '+user.lname,
                    "userData": "san isidro"
                    //"recognitionModel": "recognition_01"
                }),
            })
                .done(function (data) {
                    setUser({
                        ...user,
                        personID: data.personId
                    })
                    for (let i = 0; i < img.length; i++) {
                        $.ajax({
                            url: "https://eastasia.api.cognitive.microsoft.com/face/v1.0/persongroups/" + "alphahelm" + "/persons/" + data.personId + "/persistedFaces",// + $.param(params),
                            beforeSend: function (xhrObj) {
                                // Request headers
                                xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "d48fdff6e7af4dfd86fbb757c44c6884");
                            },
                            processData: false,
                            type: "POST",
                            // Request body
                            data: makeblob(img[0].toString())
                        })
                            .done(function (data) {
                                console.log(data)
                                //alert("success");
                            })
                            .fail(function (err) {
                                console.log(err);
                                alert("error");
                    
                            });
                    }
                    alert('Done!!')
                })
                .fail(function (err) {
                    console.log(err);
                    alert("error");
            
                });
            }
            
        }
        else {
            alert('upload samples!')
        }
        
    }
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) {
            return ( 
                <Container style={{marginBottom:'40px', marginTop:'40px'}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Register Person</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="group">
                                    <Form.Label>Group ID:</Form.Label>
                                    <Form.Control type="text" value="alphahelm" placeholder="alphahelm" onChange={handleGroup} disabled/>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="fname">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="lname">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Address:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Address" onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group controlId="age">
                                    <Form.Label>Age:</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Age" onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group style={{display:'inline'}}>
                                    <Form.Label style={{paddingRight:'30px',paddingBottom:'10px',display:'block'}}>Sample Pictures (min. of 20):</Form.Label>
                                    {/* <Button variant='secondary' style={{paddingBottom:'inline'}}> */}
                                        {/* <ReactFileReader base64={true} multipleFiles={true} handleFiles={onSelectImg}>
                                            Upload
                                        </ReactFileReader>  */}
                                    <div>
                                        <FileBase
                                            type="file"
                                            multiple={true}
                                            onDone={(base64)=>onSelectImg(base64)}/>
                                    </div>
                                        
                                    {/* </Button> */}
                                </Form.Group>
                                <p id="photo-length" style={{display:'inline', paddingLeft:'20px'}}></p>
                                <Form.Group style={{marginTop:'30px'}}>
                                    <Button variant="outline-primary" type="submit" block>
                                        Register
                                    </Button>
                                </Form.Group>

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
 
export default AddPerson;