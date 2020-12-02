import { openModalAddNewCard } from "./modal";

console.log('content.js')

const subNav = document.getElementById('sub-nav')
const controlNav = document.getElementById('control-nav')
const mainContainer = document.querySelector('.container-col')
const addNewCard = document.getElementById('add-new-card')

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
function mediaQueryForSubPanel(){
    if(window.matchMedia("(max-width:769px)").matches){
        subNav.classList.add('disable-panel')
        subNav.classList.remove('enable-panel')
        subNav.style.width = '0px'
    }
}
function renderAddCardModal(){
   document.body.innerHTML = openModalAddNewCard('Create new item')
}

document.addEventListener('DOMContentLoaded', mediaQueryForSubPanel)
controlNav.addEventListener('click', toggleNavHandler)
addNewCard.addEventListener('click',renderAddCardModal)

