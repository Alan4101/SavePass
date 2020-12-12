import firebase from "firebase/app"
import 'firebase/database'
// import 'firebase/auth'
import { message } from "./modal";

const firebaseConfig = {
    apiKey: "AIzaSyAIkbPrsnDlcA8IURS7y0P5JAnLjiMnHJM",
    authDomain: "passwordmaster-f995d.firebaseapp.com",
    databaseURL: "https://passwordmaster-f995d-default-rtdb.firebaseio.com",
    projectId: "passwordmaster-f995d",
    storageBucket: "passwordmaster-f995d.appspot.com",
    messagingSenderId: "515467520928",
    appId: "1:515467520928:web:f34eebb94b4eb5879352c5",
    measurementId: "G-70BNHQJX12"
};

firebase.initializeApp( firebaseConfig )

/****** operation with db******/
export function updateRecord(path, id, data){
    return firebase.database().ref(`${path}/${id}`).set(data)
}
//select record from db
export function selectRecord(path, id){
    return  firebase.database().ref(`${path}/${id}`).once('value')
}
//deleted data from db
export function deleteRecord(path,id){
    return  firebase.database().ref(`${path}/${id}`).remove()
        .then( () =>{
            message('success','Success', 'The card is successfully deleted!')
        })
        .catch( err => {
            console.warn(err)
            message('error','Error', 'The card is`t deleted!')

        })
}
/**** end operation from db ****/
