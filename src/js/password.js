// import firebase from "firebase/app";
import {toCard} from "./content";

export class Password{

    //отримання всі записів з бази
    static getAll(){
        return fetch('https://passwordmaster-f995d-default-rtdb.firebaseio.com/password.json',{
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then( res => res.json())



    }
    // static getById(from, id){
    //     return firebase.database().ref(`${from}/${id}`).once('value')
    //         .then(snapshot => {
    //             console.log(snapshot.val())
    //             Password.renderToHtml(snapshot.val())
    //         })
    // }
    //створення нового запису в базу
    static create (data){
        return fetch('https://passwordmaster-f995d-default-rtdb.firebaseio.com/password.json',{
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then( res => res.json() )
    }
    //відображення на даних з сервера
    static renderToHtml(data){
        for(let item in data){
            document.getElementById('main-wrapper').insertAdjacentHTML('afterbegin', toCard(data[item], item))
        }
    }

}
