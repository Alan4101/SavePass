console.log('modal');

export function openModalAddNewCard(title = 'Modal'){
    const content = `<form id="" action="" name="form-add-source" class="form-add-item">
                <div class="modal-input">
                    <label for="input-name-source">Name source</label>
                    <input id="input-name-source" class="inp-source" type="text">
                </div>
                <div class="modal-input">
                    <label for="input-login-source">Login</label>
                    <input id="input-login-source" class="inp-source" type="text">
                </div>
                <div class="modal-input">
                    <label for="input-pass-source">Password</label>
                    <input id="input-pass-source" class="inp-source" type="text">
                </div>
            </form>`
    return createModal(content,title)
}

/*create clear modal*/
function createModal(content, title){
    return  `<div class="modal-window">
    <div class="modal-wrapper">
        <div class="modal-header">
            <div class="modal-title">
                <h3>${title}</h3>
            </div>
            <button class="modal-btn close-modal"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            ${content}
        </div>
        <div class="modal-footer">
            <button class="modal-btn add-source-btn">Add</button>
            <button class="modal-btn close-modal-btn">Close</button>
        </div>
    </div>
</div>`
}
