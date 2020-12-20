import {confirmPassword, isValid} from "./utils";
import {message} from "./modal";
import {createUser} from "./firebase.operation";

const form = document.forms['auth-form']
const inputs1 = document.getElementsByTagName("input")

for (let i =0; i<inputs1.length; i++){
    inputs1[i].addEventListener('change', changeInput)

}
function changeInput(e){
    if(e.target.value.indexOf(" ") !== -1) {
        e.target.style.borderColor = 'red'
        message('error', 'Error', 'The field must not contain spaces!')
    }
}
function emptyInput(inputs){
     let s = [];

    for(let i of inputs){
         if(!isValid(i.value)){
             s.push(i.name)
         }
     }
    console.log(s)
    return s
}
form.submit.onclick = function (e){
    e.preventDefault()

    const inputs = form.getElementsByTagName("input")

    if(emptyInput(inputs).length){

        emptyInput(inputs).forEach( i => form[i].style.borderColor = 'red')

    }else if(!confirmPassword(form.password.value, form.confirmPassword.value)){

        message('error', 'Error', 'The fields <b>Password</b> and <b>Confirm password</b> are different')

    } else {
        for(let i of inputs){
            i.style.borderColor = 'transparent'
        }

        createUser(form.login.value, form.password.value).then(()=>{
            console.log('send Form')
            message('success','Success', 'Registration successful!')
            form.reset()
        })
        // message('success','Success', 'Registration successful!')
        //     form.reset()


    }

}

/**
 * перевірка чи не пусті
 * якщо пусті всі заблокувати відправку форми і виділити червоним
 * якщо хочаб один пустий виділити червоним і заблокувати відпрвку форми
 * перевірка поля password і confirmPassword
 *
 * **/
