export class Password{
    //отримання всі записів з бази
    static getAll(){
        return fetch('https://passwordmaster-f995d-default-rtdb.firebaseio.com/password.json',{
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then( res => res.json())
            .then(Password.renderToHtml)


    }
    //створення нового запису в базу
    static create (data){
        return fetch('https://passwordmaster-f995d-default-rtdb.firebaseio.com/password.json',{
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then( res => res.json() )
    }
    //відображення на даних з сервера
    static renderToHtml(data){
        for(let item in data){
            document.getElementById('main-wrapper').insertAdjacentHTML('afterbegin', toCard(data[item], item))
        }
    }

}
//лок для відображення картки з паролями та іншими даними
function toCard(data, key){
    return `<div class="col-md-4 col-xs-12">
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
                        <hr>
                        <div class="item-footer">
                            <p class="date-field" title="Date of creation">${new Date(data.date).toLocaleDateString()}</p>
                            <p class="time-field" title="Time of creation">${new Date(data.date).toLocaleTimeString().slice(0,-3)}</p>
                            <div class="item-btn" data-name="${key}">
                                <button class="btn-edit-passcard btn-card" title="Edit"><i class="fas fa-pen"></i></button>
                                <button class="btn-delete-passcard btn-card" title="Delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    </div>`
}