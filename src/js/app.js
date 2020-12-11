/*
* app        - main bundle
* content    - processing with html
* modal      - processing and creation of modal windows
* password   - data processing to send and receive from backend
* utils      - middlewares
* auth       - authorization file
* */
import '../style/index.scss'
import './content.js'
import { Password } from "./password";

document.addEventListener("DOMContentLoaded",()=>{


    Password.getAll()
        .then( res=>{
            for(let i of document.querySelectorAll('.temp')){
               i.style.visibility = "hidden"
            }
            Password.renderToHtml(res)
        })
        .catch( err => console.log(err))
})

console.log('app.js')



