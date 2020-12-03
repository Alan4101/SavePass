import { createModalAddNewCard, createModalAuth} from "./modal";

const subNav = document.getElementById('sub-nav')
const controlNav = document.getElementById('control-nav')
const mainContainer = document.querySelector('.container-col')
const addNewCardBtn = document.getElementById('add-new-card')
const accountBtn = document.getElementById('login-account')
const tem = documen.querySelector
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


document.addEventListener('DOMContentLoaded', mediaQueryForSubPanel)
controlNav.addEventListener('click', toggleNavHandler)
addNewCardBtn.addEventListener('click',renderAddCardModal)
accountBtn.addEventListener('click', renderAuthForm)
