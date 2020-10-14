import React, { useState, useContext,useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { FaSearch, FaPencilAlt, FaUserPlus } from 'react-icons/fa'
import UserList from './UserList';
import Modal from 'react-modal'
import { Redirect } from 'react-router-dom'


import UserAdd from './UserAdd';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
Modal.setAppElement('#root');
const UserPage = () => {
    const [idQuery, setIdQuery] = useState('')
    const [editState, setEditState] = useState(false)
    const [addState, setAddState] = useState(false)
    const [deleteState, setDeleteState] = useState([false, null])

    const { users, dispatch } = useContext(UserContext)
    const [localUsers, setLocalUsers] = useState(users)
    const [isAuth, setIsAuth] = useState(false)
    const { currentUser, userProfile } = useContext(AuthContext)
    

    useEffect(() => {
        if (idQuery == '') {
            setLocalUsers(users) 
        } else {
            const searchResult = users.filter(user => (user.fname.includes(idQuery)||user.lname.includes(idQuery)))
            setLocalUsers(searchResult) 
        }
        console.log(idQuery)
    }, [idQuery])

    useEffect(() => {
        if (userProfile != null && userProfile.isAdmin) {
            if (Object.entries(userProfile).length != 0) {
                if (editState) {
                    document.getElementById('editButtonFloat').style.backgroundColor = "#FFE400"
                    document.getElementById('editIcon').style.color = "black"
                } else {
                    document.getElementById('editButtonFloat').style.backgroundColor = "#6e01f8"
                    document.getElementById('editIcon').style.color = "white"
                }
            }
        }
        
    }, [editState])

    useEffect(() => {
        if (userProfile != null && userProfile.isAdmin) {
            if (Object.entries(userProfile).length != 0) {
                if (addState) {
                    document.getElementById('addButtonFloat').style.backgroundColor = "#FFE400"
                    document.getElementById('addIcon').style.color = "black"
                } else {
                    document.getElementById('addButtonFloat').style.backgroundColor = "#6e01f8"
                    document.getElementById('addIcon').style.color = "white"
                }
            }
        }
    }, [addState])

    useEffect(() => {
        setDeleteState([false, null])
        console.log(users)
            setLocalUsers(users)    
    }, [users])

    const handleSearch = (e) => {
        setIdQuery(e.target.value)
        
        
    }
     const handleSubmit = (e) => {
        e.preventDefault();
        if (idQuery == '') {
            setLocalUsers(users) 
        } else {
            const searchResult = users.filter(user => user.fname.includes(idQuery))
            setLocalUsers(searchResult) 
        }   
    }

    const toggleEdit = () => {
        setEditState(!editState);
    }
    const toggleDelete = (id) => {
        setDeleteState([!deleteState[0], id]);
        console.log(deleteState)
    }

    const toggleAdd = () => {
        setEditState(false);
        setAddState(!addState);
    }
   
        if (userProfile != null) {
            if (Object.entries(userProfile).length != 0) {
                return (
                    <Container>
                        <Modal isOpen={addState} onRequestClose={() => setAddState(false)}
                            style={
                                {
                                    overlay: {
                                        backgroundColor: 'rgb(0,0,0,0.5)',
                                    },
                                    content: {
                                        backgroundColor: 'white',
                                        border: '0',
                                        borderRadius: '4px',
                                        bottom: 'auto',
                                        minHeight: '35rem',
                                        left: '50%',
                                        padding: '50px',
                                        position: 'fixed',
                                        right: 'auto',
                                        top: '50%',
                                        transform: 'translate(-50%,-50%)',
                                        minWidth: '30rem',
                                        width: '80%',
                                        maxWidth: '40rem'
                                    }
                                }
                            }>
                            <UserAdd setAddState={setAddState} />
                        </Modal>


                        <Modal isOpen={deleteState[0]} onRequestClose={() => setDeleteState(false, null)}
                            style={
                                {
                                    overlay: {
                                        backgroundColor: 'rgb(0,0,0,0.5)',
                                    },
                                    content: {
                                        backgroundColor: 'white',
                                        border: '0',
                                        borderRadius: '4px',
                                        bottom: 'auto',
                                        minHeight: '10rem',
                                        left: '50%',
                                        padding: '50px',
                                        position: 'fixed',
                                        right: 'auto',
                                        top: '50%',
                                        transform: 'translate(-50%,-50%)',
                                        minWidth: '5rem',
                                        width: '80%',
                                        maxWidth: '40rem'
                                    }
                                }
                            }>
                            <div style={{ position: 'relative' }}>
                                <h3 className="grey-text" style={{ textAlign: 'center' }}>Delete Confirmation</h3>
                                <div style={{ margin: '30px' }}>
                                    <Button variant="secondary"
                                        style={{ position: 'absolute', right: '1em' }}
                                        onClick={() => setDeleteState(false, null)}>
                                        Cancel
                    </Button>
                                    <Button variant="danger"
                                        style={{ position: 'absolute', right: '6em' }}
                                        onClick={() => dispatch({ type: 'DELETE_USER', id: deleteState[1] })}>
                                        Confirm
                    </Button>
                                </div>
                            </div>
                        </Modal>

                        

                        <Form id='search' style={{ marginTop: '40px', marginLeft: '10px' }} onSubmit={handleSubmit}>
                            <Form.Group controlId="idQuery">
                                <Form.Control type="text" placeholder="ID search" style={{ width: '30%', display: 'inline' }} onChange={handleSearch} />
                                <Button variant='secondary' type='submit' className="green-color" style={{ marginBottom: '4px', marginLeft: '5px' }}>
                                    <span >
                                        <FaSearch style={{ fontSize: '20px' }} />
                                    </span>
                                </Button>
                            </Form.Group>
                        </Form>
                        <Container style={{ padding: '30px', marginTop: '30px', backgroundColor: 'white' }}>
                            <h3 className='grey-text'>Results found: {localUsers.length}</h3>
                            <UserList editState={editState} toggleDelete={toggleDelete} users={localUsers} />
                        </Container>
                        {userProfile.isAdmin ? (
                            <div>
                                <div style={{ position: "fixed", right: 0, bottom: 80 }}>
                            <Button variant="dark" onClick={toggleEdit} id='editButtonFloat'
                                style={{ borderRadius: '30px 30px 30px 30px', padding: '15px', margin: '20px' }}>
                                <FaPencilAlt id='editIcon' style={{ fontSize: '30px' }} />
                            </Button>

                        </div>
                        <div style={{ position: "fixed", right: 0, bottom: 160 }}>
                            <Button variant="dark" onClick={toggleAdd} id='addButtonFloat'
                                style={{ borderRadius: '30px 30px 30px 30px', padding: '15px', margin: '20px', backgroundColor: '#6e01f8' }}>
                                <FaUserPlus id='addIcon' style={{ fontSize: '30px', color: 'white' }} />
                            </Button>
                        </div>
                            </div>
                        ) : (null)}
                        
                    </Container >
                );
            }
    } else {
       return <Redirect to='/' />
    }
   return <div>Loading..</div>
    
}

export default UserPage;

