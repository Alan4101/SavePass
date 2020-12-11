export function isValid(value){
    return value.length > 0
}
export function clearInput(...input){
    input.map( i=>{
        i.value=''
    })
}
