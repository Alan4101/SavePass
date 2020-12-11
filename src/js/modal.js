/*creating modal window for adding new record*/
export function createModalAddNewCard(title = 'Modal'){

    const content = `<form id="" action="" name="form-add-source" class="form-add-item">
                <div class="modal-input">
                    <label for="input-name-source">Name source</label>
                    <input id="input-name-source" class="inp-source" type="text" required>
                </div>
                <div class="modal-input">
                    <label for="input-login-source">Login</label>
                    <input id="input-login-source" class="inp-source" type="text" required autocomplete="on">
                </div>
                <div class="modal-input">
                    <label for="input-pass-source">Password</label>
                    <input id="input-pass-source" class="inp-source" type="password" required autocomplete="on">
                </div>
            </form>`
    return createModal(content,title,'Add', 'add-new-pass')
}
//modal window for auth
export function createModalAuth(title='Modal'){
    const content = `<form id="" action="" name="form-auth" class="form-auth">
                <div class="modal-input">
                    <label for="input-login-auth">Login</label>
                    <input id="input-login-auth" class="inp-source" type="text" required autocomplete="on">
                </div>
                <div class="modal-input">
                    <label for="input-pass-auth">Password</label>
                    <input id="input-pass-auth" class="inp-source" type="password" minlength="8" required autocomplete="on">
                </div>
            </form>`

    return createModal(content, title, 'Sign in')
}

export function editPasswordCardModal(title, data, id){

    const content = `<form id="" action="" name="form-edit-card" class="form-edit">
                <div class="modal-input">
                    <label for="input-source-edit">Name source</label>
                    <input id="input-source-edit" class="inp-source" type="text" autocomplete="on" value="${data.nameSource}">
                </div>
                <div class="modal-input">
                    <label for="input-login-edit">Login</label>
                    <input id="input-login-edit" class="inp-source" type="text" autocomplete="on" value="${data.login}">
                </div>
                <div class="modal-input">
                    <label for="input-pass-edit">Password</label>
                    <input id="input-pass-edit" class="inp-source" type="text" minlength="8" autocomplete="on" value="${data.password}">
                </div>
            </form>`
    return createModal(content, title, 'Save', 'save-card', id)
}
/*create clear modal*/
function createModal(content, title, btnName, btnAction, id){
    return  `<div class="modal-window ">
    <div class="hidden-modal modal-wrapper ">
        <div class="modal-header">
            <div class="modal-title">
                <h3>${title}</h3>
            </div>
            <button class="modal-btn close-modal-btn" ><i data-action="btn-close" class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            ${content}
        </div>
        <div class="modal-footer">
            <button class="modal-btn add-source-btn" ${id?'data-id='+id :''} data-action="${btnAction}">${btnName}</button>
            <button class="modal-btn close-modal-btn" data-action="btn-close">Close</button>
        </div>
    </div>
</div>`
}
// close modal window
export function closeModalWindow(e){
    if(e.target.dataset.action === 'btn-close'){
        document.querySelector('.modal-window').classList.add('hidden-modal');
        setTimeout(()=>document.querySelector('.modal-window').remove(),500)

    }
}

/*Message*/
export function message(type, messageHeader, message){
    const messageConfig = {
        success: 'far fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-exclamation-circle'

    }
    for(let t in messageConfig){
        if (type === t){
            const messageContent = `
        <div class="message-container ${t}">
            <div class="message-header">
                <p>${messageHeader}</p>
                <p><i class="${messageConfig[t]}"></i></p>
            </div>
            <div class="message-body">
                <p>${message}</p>
            </div>
        </div>`
            document.body.insertAdjacentHTML('beforeend', messageContent)
        }
    }
    const elm = document.querySelector('.message-container')

    setTimeout(() => elm.classList.add('hide-element'),1000)
    setTimeout(() => elm.remove(),1500)
}
