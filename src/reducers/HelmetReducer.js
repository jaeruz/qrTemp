
import firebase from '../config/fbConfig'

export const HelmetReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_HELMET':
            return [
                ...action.helm,
            ];
        case 'UPDATE_HELMET_DETECTION':
            return state;
        case 'DELETE_HELMET':
            firebase
                .firestore()
                .collection('helmets')
                .doc(action.id)
                .delete()
                .then(() => {
                    console.log('deleted');
                }).catch((err) => { console.log(err) })
            return state
        case 'ADD_USER_ERROR':
            console.log(action.err)
            return state;
        
        default:
            return state;
    }
}