import firebase from "firebase/app"
import 'firebase/database'
import 'firebase/auth'
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
export async function updateRecord(path, id, data){
    return await firebase.database().ref(`${path}/${id}`).set(data)
}
//select record by id from db
export async function selectRecordById(path, id){
    return  await firebase.database().ref(`${path}/${id}`).once('value')
}
// select all record
export async function selectAllRecord(path){
    try {
        const list = await firebase.database().ref(`${path}`).once('value')
        return list.val()
    }catch (error){
        console.log(error)
        throw error
    }
}
//deleted data from db
export async function deleteRecord(path,id){
    return  await firebase.database().ref(`${path}/${id}`).remove()
        .then( () =>{
            message('success','Success', 'The card is successfully deleted!')
        })
        .catch( err => {
            console.warn(err)
            message('error','Error', 'The card is`t deleted!')

        })
}
// create new record
export async function createRecord(path, data){
    try{
        const addData = await firebase.database().ref(`${path}`).push(data)
        // console.log(addData)
    }catch (error){
        console.log(error.message)
        throw error
    }
}
/**** end operation from db ****/

/**** auth operation ****/
export function createUser(email, password){
    return  firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( user =>{
            console.log(user)
        })
        .catch( error => {
            console.log(error.code, error.message)
        })
}
export function sigIn(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then( user => {
            console.log(user)
        })
        .catch(error => {
            console.log(error.code, error.message)
        })
}
/****end auth ***/
