import firebase from "../config/fbConfig"
import $ from "jquery"
export const UserReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [
        // ...state,
        // {
        //     fname: action.user.fname,
        //     lname: action.user.lname,
        //     id: uuid(),
        //     address: action.user.address,
        //     email: action.user.email
        // }
        ...action.users,
      ]

    case "DELETE_USER":
      // console.log(action.id)
      // console.log(action.personID)
      // console.log(action.group)
      // $.ajax({
      //     url: "https://detectrecogdemo.cognitiveservices.azure.com/face/v1.0/persongroups/"+action.group+"/persons/"+action.personID,
      //     beforeSend: function(xhrObj){
      //         // Request headers
      //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d48fdff6e7af4dfd86fbb757c44c6884");
      //     },
      //     type: "DELETE",
      // })
      // .done(function(data) {
      //     console.log(data)
      //     firebase
      //     .firestore()
      //     .collection('persons')
      //     .doc(action.id)
      //     .delete()
      //     .then(() => {
      //         console.log('delete');
      //     }).catch((err) => { console.log(err) })
      //     alert("Deleted");
      // })
      // .fail(function(err) {
      //     console.log(err);
      //     alert("Error.Please try again");

      // });

      firebase
        .firestore()
        .collection("persons")
        .doc(action.id)
        .delete()
        .then(() => {
          alert("Deleted")
        })
        .catch((err) => {
          console.log(err)
        })

      /////////
      // firebase
      //     .firestore()
      //     .collection('persons')
      //     .doc(action.id)
      //     .delete()
      //     .then(() => {
      //         console.log('gg');
      //     }).catch((err) => { console.log(err) })
      return state
    default:
      return state
  }
}
