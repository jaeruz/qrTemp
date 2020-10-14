
import firebase from '../config/fbConfig'
export const AuthReducer = (state, action) => {

    switch (action.type) {
        case 'SIGNIN':
            // console.log(action.user)
            return {
                ...action.user
            }
        case 'SIGNOUT':{
            firebase.auth().signOut().then(() => {
                console.log('signed out')
            }).catch((err) => console.log(err))
            break
        }
        case 'SIGNUP':{
            firebase.auth().createUserWithEmailAndPassword(
                action.user.email,
                action.user.password
            ).then((resp) => {
                return firebase.firestore().collection('users').doc(resp.user.uid).set({
                    fname: action.user.fname,
                    lname: action.user.lname,
                    age: action.user.age,
                    address:action.user.address,
                    isAdmin: action.user.isAdmin,
                    dateCreated: new Date()
                })
            }).then(() => { console.log('user created') })
                .catch((err) => console.log(err))
            break
        }
        case 'ADD_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}