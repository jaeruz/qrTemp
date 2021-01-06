import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';


const UserList = ({ editState, users, toggleDelete,history }) => {
    const handleViewProfile = (id) => {
        history.push('/profile/'+id)
    }

    const deleteUser = (id,personID,group) => {
        toggleDelete(id,personID,group)
    }
    return (
        <div>
            <p className="grey-text" style={{ textAlign: 'center' }}>Click to View More</p>
            {users.length ? (users.map(user => (
                <Card key={user.id} style={{ marginBottom: '20px' }}>
                    <Row style={{textAlign:"center"}}>
                        <Col sm={3} md={3} lg={2}>
                            <Avatar size="80" name={user.fname + ' ' + user.lname} round={true} style={{ margin: '20px' }} />
                        </Col>
                        <Col sm={6} md={7} lg={8}>
                            <div style={{ padding: '20px' }}>
                                <h5 className="grey-text">Name: {user.fname + ' ' + user.lname}</h5>
                                <h5 className="grey-text">Age: {user.age}</h5>
                            </div>
                        </Col>
                        <Col sm={3} md={2} lg={2}>
                            {editState ? (
                                <>
                                    <Button variant="info" style={{ height: '50%', margin: '1px' }} disabled block>
                                        <FaUserEdit style={{ fontSize: '25px' }} />
                                    </Button>
                                    <Button variant="danger" style={{ height: '50%', margin: '1px' }} onClick={() => deleteUser(user.id,user.personID,user.group)} block>
                                        <FaTrashAlt style={{ fontSize: '25px' }} />
                                    </Button> 
                                </>
                            ) : (
                                    <Button variant="info" style={{ height: '100%', margin: '1px',width:'100%' }} onClick={()=>handleViewProfile(user.id)} block>
                                        View Profile
                                    </Button>
                                )}
                        </Col>
                    </Row>
                </Card>
            ))
            ) : (
                    <p>no result</p>
                )
            }
        </div>
    );
}

export default UserList;