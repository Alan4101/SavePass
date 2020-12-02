export class Password{
    static getAll(){
        return fetch('http://localhost:3000/data.json',{
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=> res.json())
            .then(Password.renderToHtml)
    }
//відображення на даних з серверу
    static renderToHtml(data){
        for(let item in data){
            document.getElementById('main-wrapper').insertAdjacentHTML('afterbegin', toCard(data[item]))
        }
    }

}

function toCard(data){
    return `<div class="col-md-4 col-xs-12">
                    <div class="main-wrapper__item">
                        <div class="item-header">
                            <h3 class="title-passcard">${data.nameSource}</h3>
                        </div>
                        <div class="item-body">
                            <label>Login:</label>
                            <p class="login-field">${data.login}</p>
                            <label>Password:</label>
                            <p class="pass-field">${data.password}</p>
                        </div>
                        <div class="item-footer">
                            <p class="date-field" title="Date of creation">${data.date}</p>
                            <p class="time-field" title="Time of creation">${data.time}</p>
                            <div class="item-btn">
                                <button class="btn-edit-passcard btn-card" title="Edit"><i class="fas fa-pen"></i></button>
                                <button class="btn-delete-passcard btn-card" title="Delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    </div>`
}