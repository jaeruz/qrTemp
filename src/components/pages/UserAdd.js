import React, { useState } from 'react'
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import firebase from '../../config/fbConfig'
import AddPerson from '../procedure/AddPerson'

const UserAdd = ({ setAddState }) => {
    const { dispatch } = useContext(UserContext)
    const [user, setUser] = useState({
                    temps:[],
                    lastTemp: Math.floor(Math.random() * (40-25))+25,
                    date: new Date()
                })
    const handleSubmit = (e) => {
        e.preventDefault();
        firebase
            .firestore()
            .collection('employees')
            .add({
                user
            })
            .catch((err) => {
                dispatch({ type: 'ADD_USER_ERROR', err })
            })


        setAddState(false)
        // console.log(user)

    }
    const handleChange = (e) => {
        // console.log(user)
        setUser({
            ...user,
            [e.target.id]: e.target.value
        })
    }

    return (
        <Container style={{ color: 'black' }}>
            <AddPerson/>
        </Container>
    );
}

export default UserAdd;