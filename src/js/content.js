import {createModalAddNewCard, createModalAuth, editPasswordCardModal, message} from "./modal";
import {Password} from "./password";
import {clearInput, isValid} from "./utils";
import firebase from "firebase";

const subNav = document.getElementById('sub-nav')
const controlNav = document.getElementById('control-nav')
const mainContainer = document.querySelector('.container-col')
const addNewCardBtn = document.getElementById('add-new-card')
const accountBtn = document.getElementById('login-account')
const containerForPasswordCard = document.getElementById('main-wrapper')

//handler for 'burger' button
function toggleNavHandler(){
    // debugger
    if(subNav.classList.contains('enable-panel')) {
        subNav.classList.add('disable-panel')
        subNav.classList.remove('enable-panel')
        subNav.style.width = '0px'
        mainContainer.style.transition = 'width .55s'
        mainContainer.style.width = '100%'

    }else {
        subNav.classList.remove('disable-panel')
        subNav.classList.add('enable-panel')
        subNav.style.width = '60px'
        mainContainer.style.width = 'calc(100% - 60px)'
    }
}
//media query for hide and show left panel navigation
function mediaQueryForSubPanel(){
    if(window.matchMedia("(max-width:769px)").matches){
        subNav.classList.add('disable-panel')
        subNav.classList.remove('enable-panel')
        subNav.style.width = '0px'
    }
}
//handler for rendering modal window for adding new data (pass, login, other)
function renderAddCardModal(){
    document.body.insertAdjacentHTML('beforeend', createModalAddNewCard('Create new item'))
    animationModal()
}
//handler for rendering auth modal window
function renderAuthForm(){
    document.body.insertAdjacentHTML('beforeend', createModalAuth('Authorization'))
    this.disabled = true
    animationModal()
}
//handler for showing a modal window with animation (deleting class 'hidden-modal in all modal windows')
function animationModal(){
    setTimeout(()=>{
        document.querySelector('.modal-wrapper').classList.remove('hidden-modal')
    },100)
}

//handler for processing click edit | delete in the card-password
function editPasswordCard(e){
    if(e.target.dataset.button){
        const nameCard = e.target.parentNode.dataset.name

        if(e.target.dataset.button ==='edit-card'){
            firebase.database().ref(`password/${nameCard}`).once('value')
                .then( snapshot => {
                    document.body.insertAdjacentHTML('beforeend', editPasswordCardModal('Edit', snapshot.val()))
                    animationModal()
                })
        }else{
            firebase.database().ref(`password/${nameCard}`).remove()
                .then( () => console.log('deleted'))
                message('success','Success', 'The card is successfully deleted!')
        }
    }
}

//лок для відображення картки з паролями та іншими даними
export function toCard(data, key= null){
    return `<div class="col-md-4 col-xs-12 server-content">
                    <div class="main-wrapper__item" data-name="${key}">
                        <div class="item-header">
                            <h3 class="title-passcard">${data.nameSource}</h3>
                        </div>
                        <div class="item-body">
                            <div class="item-panel">
                                <label>Login:</label>
                                <p class="login-field">${data.login}</p>
                            </div>
                            <div class="item-panel">
                                <label>Password:</label>
                                <p class="pass-field">${data.password}</p>
                            </div>
                        </div>
                        <div class="item-footer">
                            <p class="date-field" title="Date of creation">${new Date(data.date).toLocaleDateString()}</p>
                            <div class="item-btn" data-name="${key}">
                                <button class="btn-edit-passcard btn-card" title="Edit" data-button="edit-card"></button>
                                <button class="btn-delete-passcard btn-card" title="Delete" data-button="delete-card"></button>
                            </div>
                        </div>
                    </div>
                    </div>`
}

document.addEventListener('DOMContentLoaded', mediaQueryForSubPanel)
controlNav.addEventListener('click', toggleNavHandler)
addNewCardBtn.addEventListener('click',renderAddCardModal)
// accountBtn.addEventListener('click', renderAuthForm)
containerForPasswordCard.addEventListener('click',editPasswordCard)

document.addEventListener('click', function (e){

    if(e.target.dataset.action === 'btn-close'){

        document.querySelector('.modal-window').classList.add('hidden-modal');
        setTimeout(()=>document.querySelector('.modal-window').remove(),500)

    }else if(e.target.dataset.action ==='add-new-pass'){

        const passBody = {}
        const nameSource = document.getElementById('input-name-source')
        const login = document.getElementById('input-login-source')
        const password = document.getElementById('input-pass-source')
        const wrapperCard = document.getElementById('main-wrapper')

        if(isValid(nameSource.value) && isValid(login.value) && isValid(password.value)){

            passBody.nameSource = nameSource.value;
            passBody.login = login.value;
            passBody.password = password.value;
            passBody.date = new Date().toJSON()

            // wrapperCard.hidden = true
            // wrapperCard.textContent = ''
            const serverContent = document.querySelectorAll('.server-content')
            for(let s of serverContent ){
                // s.hidden = true
                s.remove()
            }

            const temp = document.querySelectorAll(".temp")
            for(let s of temp){
                s.style.visibility = 'visible'
            }
            Password.create(passBody)
                .then(()=>{
                    Password.getAll().then((res)=>{

                        Password.renderToHtml(res)
                        for(let s of temp){
                            s.style.visibility = 'hidden'
                        }
                        // wrapperCard.hidden = false
                    })
                    clearInput(nameSource, login, password)
                }).catch(err=>{
                    message('error', 'Error', 'Something wrong, try again!')
            })

        }

    }

})
//TODO: https://github.com/zalog/placeholder-loading прелоадер макет
//TODO: потрібно додати прелоадер поки контент завантажується з серевера https://prog-blog.ru/translations/fake-it-til-you-make-it-css/