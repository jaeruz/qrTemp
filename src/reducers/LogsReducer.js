
import firebase from '../config/fbConfig'
import $ from 'jquery'
export const LogsReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_LOGS':
            return [
                
                ...action.logs
                
                
            ];
        default:
            return state;
    }
}