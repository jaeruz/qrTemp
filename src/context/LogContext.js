import React, { createContext, useEffect, useReducer } from 'react'
import { LogsReducer } from '../reducers/LogsReducer'
import firebase from '../config/fbConfig'
export const LogsContext = createContext();

const LogsContextProvider = (props) => {
    const [logs, dispatch] = useReducer(LogsReducer, [])

    useEffect(() => {
        // console.log(logs)
        const unsubscribe = firebase
            .firestore()
            .collection('logs')
            .onSnapshot((snapshot) => {
                const logs = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                dispatch({ type: 'ADD_LOGS', logs });
            })
        
        return unsubscribe;
    }, [])
    return (
        <LogsContext.Provider value={{ logs, dispatch }}>
            {props.children}
        </LogsContext.Provider>
    )
}

export default LogsContextProvider;