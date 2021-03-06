import {
    createModalAddNewCard,
    createModalAuth,
    editPasswordCardModal,
    closeModalWindow,
    message
} from "./modal";
import { Password } from "./password";
import {
    clearInput,
    copyToBuffer,
    isValid
} from "./utils";
import {
    selectRecordById,
    deleteRecord,
    updateRecord,
    createRecord,
    selectAllRecord
} from './firebase.operation'
// import './auth'

const subNav = document.getElementById('sub-nav')
const controlNav = document.getElementById('control-nav')
const mainContainer = document.querySelector('.container-col')
const addNewCardBtn = document.getElementById('add-new-card')
const accountBtn = document.getElementById('login-account')
const containerForPasswordCard = document.getElementById('main-wrapper')
const changeCardOrList = document.getElementById('changeCardOrList')

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
                    <div class="main-wrapper__item" data-name="${key}" autofocus>
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
                                <button class="copy-password far fa-copy" autofocus></button>
<!--                                <i class="far fa-copy"></i>-->
                            </div>
                        </div>
                        <div class="item-footer">
                            <p class="date-field" title="Date of creation">${new Date(data.date).toLocaleDateString()}</p>
                            <div class="item-btn" data-name="${key}">
                                <button class="btn-edit-passcard btn-card" title="Edit" autofocus><img src="assets/img/edit.svg" data-button="edit-card" alt=""></button>
                                <button class="btn-delete-passcard btn-card" title="Delete" autofocus>
                                <img  src="assets/img/delete.svg" data-button="delete-card" alt="">
                                </button>
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
    return {
        password : document.getElementById('input-pass-edit').value,
        login : document.getElementById('input-login-edit').value,
        nameSource : document.getElementById('input-source-edit').value,
        date : new Date().toJSON()
    }
}
function getFieldsFromAddCard(){
    return {
        nameSource : document.getElementById('input-name-source'),
        login : document.getElementById('input-login-source'),
        password : document.getElementById('input-pass-source')
    }
}
/****** end get data *****/

/****** edit operation ******/
//handler for processing click edit | delete in the card-password
function editOrDeleteCard(e){
    const path = 'password'
    if(e.target.dataset.button){

        const nameCard = e.target.parentNode.parentNode.dataset.name

        if(e.target.dataset.button ==='edit-card'){

            selectRecordById(path, nameCard).then( snapshot => {
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
                        closeModalWindow()
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
//click btn-close modal window
function closeModalWindowBtnClose(e){
    if(e.target.dataset.action === 'btn-close'){
        e.preventDefault()
        closeModalWindow()
    }
}
/****add new record in db */
function addNewRecord(e){
    if(e.target.dataset.action ==='add-new-pass'){
        e.preventDefault()

        const data = getFieldsFromAddCard()

        if(isValid(data.nameSource.value) && isValid(data.login.value) && isValid(data.password.value)){

            data.nameSource = data.nameSource.value;
            data.login = data.login.value;
            data.password = data.password.value;
            data.date = new Date().toJSON()

            animationDomLoad(true)

            createRecord('password', data)
                .then( ()=> {
                    selectAllRecord('password').then( res => {
                        Password.renderToHtml(res)
                        animationDomLoad()

                        let data1 = getFieldsFromAddCard()
                        clearInput(data1.nameSource, data1.login, data1.password)

                    })
                })

        }

    }
}
/** end add new card**/

/**copy password to buffer**/
function copyPasswordToBuffer(e){
    if(e.target.classList.contains('copy-password')){
        const text = e.target.previousSibling.previousSibling.textContent
        copyToBuffer(text)
            .then( () => {
                message('success', 'Copied', '')
            })
            .catch(error => {
                message('error', 'Error', error)
                console.log(error)
            })
    }
}
/** end function copy **/

/*****function for change view content on list or table ***/
function viewCardOrList(e){
    const containersItem = document.querySelectorAll('.main-wrapper__item')
    e.preventDefault()

    if(e.target.classList.contains('fa-th')){
        e.target.classList.remove('fa-th')
        e.target.classList.add('fa-bars')

        containerForPasswordCard.classList.add('type-list-col')

        containersItem.forEach(i=>{
            i.classList.add('type-list-row')
            i.parentNode.classList.remove('col-md-4')
            i.childNodes.forEach(j =>{
                if(j.nodeName!=='#text'){
                    j.classList.add('col-md-4')
                }
            })
        })
        document.querySelectorAll('.item-body').forEach(i => i.classList.add('row-space-between'))
    }else {
        e.target.classList.add('fa-th')
        e.target.classList.remove('fa-bars')

        containerForPasswordCard.classList.remove('type-list-col')

        containersItem.forEach(i=>{
            i.classList.remove('type-list-row')
            i.parentNode.classList.add('col-md-4')
            i.childNodes.forEach(j =>{
                if(j.nodeName!=='#text'){
                    j.classList.remove('col-md-4')
                }
            })
        })
        document.querySelectorAll('.item-body').forEach(i => i.classList.remove('row-space-between'))
    }

}
/*****end function change view ***/

function init(event) {
    saveDataCard(event)
    closeModalWindowBtnClose(event)
    addNewRecord(event)
    copyPasswordToBuffer(event)
}
// accountBtn.addEventListener('click', renderAuthForm)
function initLoaded(){

    mediaQueryForSubPanel()
    /****/
    Password.getAll()
        .then( res=>{
            for(let i of document.querySelectorAll('.temp')){
                i.style.visibility = "hidden"
            }
            Password.renderToHtml(res)
        })
        .catch( err => console.log(err))
}

if(document.body.dataset.body!=='home'){

    document.addEventListener("DOMContentLoaded", initLoaded)

    document.addEventListener('click', init)
    // document.addEventListener('click', saveDataCard )
    // document.addEventListener('click', closeModalWindowBtnClose)
    // document.addEventListener('click', addNewRecord)

    controlNav.addEventListener('click', toggleNavHandler)

    addNewCardBtn.addEventListener('click',renderModalAddCard)

    containerForPasswordCard.addEventListener('click', editOrDeleteCard)

    changeCardOrList.addEventListener('click', viewCardOrList)

    console.log('page MP')
}else {

}
//TODO: https://github.com/zalog/placeholder-loading прелоадер макет
