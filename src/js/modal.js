// console.log('modal');
//
export function openModalAddNewCard(title = 'Modal'){

    const content = `<form id="" action="" name="form-add-source" class="form-add-item">
                <div class="modal-input">
                    <label for="input-name-source">Name source</label>
                    <input id="input-name-source" class="inp-source" type="text" required>
                </div>
                <div class="modal-input">
                    <label for="input-login-source">Login</label>
                    <input id="input-login-source" class="inp-source" type="text" required>
                </div>
                <div class="modal-input">
                    <label for="input-pass-source">Password</label>
                    <input id="input-pass-source" class="inp-source" type="text" required>
                </div>
            </form>`
    return createModal(content,title,'Add')
}

export function openModalAuth(title='Modal'){
    const content = `<form id="" action="" name="form-auth" class="form-auth">
                <div class="modal-input">
                    <label for="input-login-auth">Login</label>
                    <input id="input-login-auth" class="inp-source" type="text" required>
                </div>
                <div class="modal-input">
                    <label for="input-pass-auth">Password</label>
                    <input id="input-pass-auth" class="inp-source" type="password" minlength="8" required>
                </div>
            </form>`

    return createModal(content, title, 'Sign in')
}
/*create clear modal*/
function createModal(content, title, btnName){
    return  `<div class="modal-window">
    <div class="modal-wrapper">
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
            <button class="modal-btn add-source-btn">${btnName}</button>
            <button class="modal-btn close-modal-btn" data-action="btn-close">Close</button>
        </div>
    </div>
</div>`
}

document.addEventListener('click', function (e){
    if(e.target.dataset.action === 'btn-close'){
        document.querySelector('.modal-window').remove();
    }
})

