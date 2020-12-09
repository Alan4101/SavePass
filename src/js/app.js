/*
* app        - main bundle
* content    - processing with html
* modal      - processing and creation of modal windows
* password   - data processing to send and receive from backend
* utils      - middlewares
* auth       - authorization file
* */
import '../style/index.scss'
import './content.js'
import  firebase  from "firebase";

import { Password } from "./password";

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
// const url = 'https://passwordmaster-f995d-default-rtdb.firebaseio.com/password.json'

firebase.initializeApp( firebaseConfig )

document.addEventListener("DOMContentLoaded",()=>{


    Password.getAll()
        .then( res=>{
            for(let i of document.querySelectorAll('.temp')){
               i.style.visibility = "hidden"
            }
            Password.renderToHtml(res)
        })
        .catch( err => console.log(err))
})

console.log('app.js')



