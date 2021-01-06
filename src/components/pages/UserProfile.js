import React,{ useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row,Button,Modal } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import Avatar from 'react-avatar';
import { FaRegEdit,FaQrcode } from 'react-icons/fa';
import QRCode from 'qrcode.react'
import Moment from 'react-moment';
import 'moment-timezone';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const UserProfile = (props) => {
    const { users, dispatch } = useContext(UserContext)
    const [specificUser, setSpecificUser] = useState(null)
    const [QRState, setQRState] = useState(false)
    const { currentUser, userProfile } = useContext(AuthContext)
    
    
    useEffect(() => {
        let id = props.match.params.id
        const su = users.filter(u => id === u.id)
        setSpecificUser(su)
    }, [users])

    useEffect(() => {
    }, [specificUser])
    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) {
            return (
                <Container style={{ padding: '30px 30px 90px 50px', marginTop: '8%', backgroundColor: 'white', color: "black", borderRadius: '5px' }}>
                    <h3 style={{ paddingTop: '10px', paddingBottom: '30px' }}>Profile</h3>
                    <Modal show={QRState} onHide={() => setQRState(false)} dialogClassName="login-modal">
                        <div style={{ display: 'block', marginTop: '50px' }}>
                            {specificUser && specificUser.length ? (
                                <>
                                    <QRCode value={specificUser[0].id} style={{ display: 'block', margin: '0 auto', width: '70%', height: '70%' }} />
                                    <Button style={{ display: 'block', margin: '30px auto' }}>Download</Button>
                                </>
                            ) : (null)}
                    
                        </div>
                    </Modal>
                   
                    {specificUser ? (
                        specificUser.length ? (
                            <Row>
                                <Col md={1}></Col>
                                <Col md={3}>
                                    <Avatar size="120" name={specificUser[0].fname + ' ' + specificUser[0].lname} round={true} style={{ margin: '30px' }} />
                                </Col>
                                <Col md={6}>
                                    <h3>{specificUser[0].fname + ' ' + specificUser[0].lname}</h3>
                            Age: <p>{specificUser[0].age}</p>
                            Email: <p>{specificUser[0].email}</p>
                            Adddress: <p>{specificUser[0].address}</p>
                            Group: <p>{specificUser[0].group}</p>
                                </Col>
                                <Col md={1}>
                                    <FaQrcode style={{ fontSize: '50px', marginRight: '10px', cursor: 'pointer' }} onClick={() => setQRState(true)} />
                                </Col>
                            </Row>
                        ) : (<p>loading..</p>)
                    ) : (null)}
            
                </Container>
            );
        }
    } else {
        return <Redirect to='/' />
    }
    return <div></div>
}
 
export default UserProfile;