//якщо сума двох будь яких елементів масиву рівна заданому чимлу поврнути true інакше false
function check(arr, num){
    //2  варіанти вирішення
    for(let i = 0; i<arr.length; i++){
        for(let j = i+1; j<arr.length; j++){
            if(arr[i]+arr[j] === num){
                return true
            }
        }
    }
    return false

    // for(let i = 0; i<arr.length; i++){
    //     for(let j = 0; j<arr.length; j++){
    //         if(i!==j && arr[i]+arr[j] == num){
    //             console.log(arr[i]+arr[j])
    //             return true
    //         }
    //     }
    // }
}

//
// console.log(check([10, 15, 10, 7], 50))//false
// console.log(check([10, 15, 4, 7], 11))//true

//повернути суму цифр числа
function sumDig(num){
    // debugger
    let n = 0
    do{
        n+=num%10
        num = Math.floor(num/10)
    }while (num!==0)

    return n
}
console.log(sumDig(111))
// console.log(sumDig(21))
// console.log(sumDig(10222))
