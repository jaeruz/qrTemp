
import firebase from '../config/fbConfig'
export const UserReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_USER':
            return [
                // ...state,
                // {
                //     fname: action.user.fname,
                //     lname: action.user.lname,
                //     id: uuid(),
                //     address: action.user.address,
                //     email: action.user.email
                // }
                ...action.users
                
                
            ];
        case 'DELETE_USER':
            firebase
                .firestore()
                .collection('employees')
                .doc(action.id)
                .delete()
                .then(() => {
                    console.log('deleted');
                }).catch((err) => { console.log(err) })
            return state
        default:
            return state;
    }
}