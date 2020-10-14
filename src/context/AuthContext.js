import React, { createContext, useEffect, useReducer, useState } from 'react'
import { AuthReducer } from '../reducers/AuthReducer';
import firebase from '../config/fbConfig'
import { object } from 'prop-types';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    
    const [currentUser, dispatch] = useReducer(AuthReducer, [])
    const [userProfile, setUserProfile] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            dispatch({ type: 'SIGNIN', user })
        })
    }, []);
    
    useEffect(() => {
        
        if (currentUser != null) {
            if (Object.entries(currentUser).length != 0) {
                // console.log(currentUser.uid)
                firebase
                    .firestore()
                    .collection('users')
                    .doc(currentUser.uid).get().then((res) => {
                        // console.log(res.data())
                        const profile = res.data()
                        setUserProfile(profile)
                    })
            }
        } else {
            setUserProfile(null)
        }
    },[currentUser])
    return ( 
        <AuthContext.Provider value={{ currentUser, dispatch,userProfile }}>
            
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;