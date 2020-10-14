import React from 'react'
import { Card, Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import firebase from '../../config/fbConfig'


const UserList = ({ editState, users, toggleDelete }) => {


    const deleteUser = (id) => {
        toggleDelete(id)
        // firebase
        //     .firestore()
        //     .collection('employees')
        //     .doc(id)
        //     .delete()
        //     .then(() => {
        //         console.log('deleted');
        //     }).catch((err) => { console.log(err) })
    }
    return (
        <div>
            <p className="grey-text" style={{ textAlign: 'center' }}>Click to View More</p>
            {users.length ? (users.map(user => (
                <Card key={user.id} style={{ marginBottom: '20px' }}>

                    <div style={{ position: 'relative' }}>
                        <div className="flex-cont">
                            <Avatar size="80" name={user.fname + ' ' + user.lname} round={true} style={{ margin: '10px' }} />
                            <div style={{ padding: '20px' }}>
                                <h5 className="grey-text">Name: {user.fname} {user.lname}</h5>
                                <h5 className="grey-text">Last Temp: {user.lastTemp}</h5>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', right: 0, top: 0 }}>
                            {editState ? (
                                <div>
                                    <Button variant="info" style={{ height: '6.5em', margin: '1px' }}>
                                        <FaUserEdit style={{ fontSize: '25px' }} />
                                    </Button>
                                    <Button variant="danger" style={{ height: '6.5em', margin: '1px' }} onClick={() => deleteUser(user.id)}>
                                        <FaTrashAlt style={{ fontSize: '25px' }} />
                                    </Button>
                                </div>
                            ) : (
                                    <Button variant="info" style={{ height: '6.5em', margin: '1px' }}>
                                        View Profile
                                    </Button>
                                )}
                        </div>
                    </div>
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