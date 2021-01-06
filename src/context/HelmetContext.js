import React, { createContext, useEffect, useReducer } from 'react'
import { HelmetReducer } from '../reducers/HelmetReducer'
import firebase from '../config/fbConfig'
import $ from 'jquery'
export const HelmetContext = createContext();

const HelmetContextProvider = (props) => {
    const [helmet, dispatch] = useReducer(HelmetReducer, [])

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('helmets')
            .onSnapshot((snapshot) => {
                const helm = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                let modelIndex = 0;
                
                for (let i = 0; i != helm.length; i++){
                    let h = helm[i].detected
                    let uniqueName = [];
                    let uniqueHelm = [];
                    
                    $.each(h, function (i, el) {
                        
                        // console.log(el.name)
                        // console.log(uniqueName)
                        // console.log($.inArray(el.name, uniqueName))
                        if ($.inArray(el.name, uniqueName) === -1) {
                            uniqueName.push(el.name)
                            uniqueHelm.push(el);
                        } else {
                            uniqueHelm = uniqueHelm.filter(u => el.name !== u.name)
                            uniqueHelm.push(el);
                        }
                    });
                    
                    helm[i].detected = uniqueHelm;
                    modelIndex = i;
                    // modelIndex = 1
                }
                
                // console.log(modelIndex)
                 firebase
                .firestore()
                .collection('helmets')
                .doc('hNh8dbIWxENzzOljNBDA')
                .set({
                    ...helm[modelIndex-1]
                })
                .catch((err) => {
                    dispatch({ type: 'ADD_USER_ERROR', err })
                })
                // console.log(helm[modelIndex-1])
                dispatch({ type: 'ADD_HELMET', helm});
            })
        
        return unsubscribe;
    }, [])
    return (
        <HelmetContext.Provider value={{ helmet, dispatch }}>
            {props.children}
        </HelmetContext.Provider>
    )
}

export default HelmetContextProvider;