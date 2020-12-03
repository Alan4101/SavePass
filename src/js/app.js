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

document.addEventListener("DOMContentLoaded", Password.getAll)

console.log('app.js')



