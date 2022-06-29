//VER ESTO
//https://www.youtube.com/watch?v=ibOLpTvigE0&list=PLBDz6tetrzyn11Zdqir0jBKMLgB41RUP6

let validarPost = () => {

    let required_inputs = document.querySelectorAll('input[required], textarea[required], input[type=file]')

    required_inputs.forEach(element => {
        element.value == '' ? element.classList.add('input-error') : element.classList.remove('input-error')
    })
}
export { validarPost };