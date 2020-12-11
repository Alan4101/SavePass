import { createModalAddNewCard, createModalAuth, editPasswordCardModal, closeModalWindow, message } from "./modal";
import { Password } from "./password";
import { clearInput, isValid } from "./utils";
import { selectRecord, deleteRecord, updateRecord } from './firebase.operation'

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

/*** operation with modal ***/
//handler for rendering modal window for adding new data (pass, login, other)
function renderModalAddCard(){
    document.body.insertAdjacentHTML('beforeend', createModalAddNewCard('Create new item'))
    animationModal()
}
//handler for rendering auth modal window
function renderAuthForm(){
    document.body.insertAdjacentHTML('beforeend', createModalAuth('Authorization'))
    this.disabled = true
    animationModal()
}
//лок для відображення картки з паролями та іншими даними
export function renderCard(data, key= null){
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
                                <button class="btn-edit-passcard btn-card" title="Edit"><img src="assets/img/edit.svg" data-button="edit-card" alt=""></button>
                                <button class="btn-delete-passcard btn-card" title="Delete"><img src="assets/img/delete.svg" data-button="delete-card" alt=""></button>
                            </div>
                        </div>
                    </div>
                    </div>`
}
//handler for showing a modal window with animation (deleting class 'hidden-modal in all modal windows')
function animationModal(){
    setTimeout(()=>{
        document.querySelector('.modal-wrapper').classList.remove('hidden-modal')
    },100)
}
/***** end with modal ******/

/****** get data with card *****/
//get all data with card edit
function getFieldsFromEditCard(){
    const data = { }
    data.password = document.getElementById('input-pass-edit').value
    data.login = document.getElementById('input-login-edit').value
    data.nameSource = document.getElementById('input-source-edit').value
    data.date = new Date().toJSON()
    return data
}
function getFieldsFromAddCard(){
    return {
        nameSource : document.getElementById('input-name-source'),
        login : document.getElementById('input-login-source'),
        password : document.getElementById('input-pass-source')
    }
}
/****** *****/

/****** edit operation ******/
//handler for processing click edit | delete in the card-password
function editOrDeleteCard(e){
    const path = 'password'
    if(e.target.dataset.button){
        const nameCard = e.target.parentNode.parentNode.dataset.name

        if(e.target.dataset.button ==='edit-card'){

            selectRecord(path, nameCard).then( snapshot => {
                document.body.insertAdjacentHTML('beforeend', editPasswordCardModal('Edit', snapshot.val(), nameCard))
                animationModal()
            })
        }else{
            animationDomLoad('start')
            deleteRecord('password', nameCard)
                .then( () => {
                    Password.getAll()
                        .then( (res) => {
                            Password.renderToHtml(res)
                            animationDomLoad()
                        })
                })
    }
}
}
// save changed data in database
function saveDataCard(e){
    if(e.target.dataset.id){
        animationDomLoad(true)
        updateRecord('password', e.target.dataset.id, getFieldsFromEditCard())
            .then( () => {
                Password.getAll()
                    .then( (res) => {
                        Password.renderToHtml(res)
                        animationDomLoad()
                    })
            })
            .catch(err => console.warn(err))
    }
}
/****** end edit ****/

function animationDomLoad(action){
    const serverContent = document.querySelectorAll('.server-content')
    const temp = document.querySelectorAll(".temp")
    if(action){
        for(let s of serverContent ){
            s.remove()
        }
        for(let t of temp){
            t.style.visibility = 'visible'
        }
    } else {
        for (let t of temp) {
            t.style.visibility = 'hidden'
        }
    }
}

/****add new record in db */
function addNewRecord(e){
    if(e.target.dataset.action ==='add-new-pass'){

        const data = getFieldsFromAddCard()

        if(isValid(data.nameSource.value) && isValid(data.login.value) && isValid(data.password.value)){

            data.nameSource = data.nameSource.value;
            data.login = data.login.value;
            data.password = data.password.value;
            data.date = new Date().toJSON()

            animationDomLoad(true)

            Password.create(data)
                .then( () => {
                    Password.getAll()
                        .then( (res) => {
                            Password.renderToHtml(res)
                            animationDomLoad()
                        })
                    clearInput(data.nameSource, data.login, data.password)
                })
                .catch( err => {
                    message('error', 'Error', 'Something wrong, try again!')
                    console.warn(err)
                })
        }

    }
}
/** end add new card**/



function init(e) {
    saveDataCard(e)
    closeModalWindow(e)
    addNewRecord(e)
}

document.addEventListener('DOMContentLoaded', mediaQueryForSubPanel)
controlNav.addEventListener('click', toggleNavHandler)

addNewCardBtn.addEventListener('click',renderModalAddCard)
// accountBtn.addEventListener('click', renderAuthForm)
containerForPasswordCard.addEventListener('click', editOrDeleteCard)

document.addEventListener('click', init)
// document.addEventListener('click', saveDataCard )
// document.addEventListener('click', closeModalWindow)
// document.addEventListener('click', addNewRecord)

//TODO: https://github.com/zalog/placeholder-loading прелоадер макет
