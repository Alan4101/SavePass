export function isValid(value){
    return value.length > 0
}
export function clearInput(...input){
    input.map( i=>{
        i.value=''
    })
}
export function copyToBuffer(text){
   return  navigator.clipboard.writeText(text)
}
export function confirmPassword(password, cPassword){
     // return  !cPassword.includes(password)
    console.log(password===cPassword)
    return password===cPassword
}