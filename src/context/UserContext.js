import React, { createContext, useEffect, useReducer } from 'react'
import { UserReducer } from '../reducers/UserReducer'
import firebase from '../config/fbConfig'
export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [users, dispatch] = useReducer(UserReducer, [])

    useEffect(() => {
        // console.log(users)
        const unsubscribe = firebase
            .firestore()
            .collection('employees')
            .onSnapshot((snapshot) => {
                const users = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data().user
                }))
                dispatch({ type: 'ADD_USER', users });
            })
        return unsubscribe;
    }, [])
    return (
        <UserContext.Provider value={{ users, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;