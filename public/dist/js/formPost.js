import { validarPost } from './validarPost.js';

function formPost() {
    //$ Al hacer click en la cruz

    //$ Al hacer click en POSTEAR, se abre el modal
    const $formPost = document.querySelector("#formPost");
    const $selectForm = document.querySelector(".modalPost__formSelect");

    // const $nameAnimal = document.querySelector("#userName")
    // const showName = (formData) => {
    //     const nameAnimal = formData.get("nameAnimal")

    // }

    //?Hacer un forEach para cargar cada imagen, ya que van a ser 3
    const $inputsImage = document.querySelectorAll(".inputAnimal");
    // const $image = document.querySelectorAll(".previewAnimal");

    //*Hacerlo para las 3 imagenes
    function renderImages(formData, input) {
        const $image = input.nextElementSibling.firstElementChild;
        const $element = input.parentElement;
        $image.classList.add("opacityOn");
        $element.style.border = "none";
        $image.style.borderRadius = "10px";
        $element.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.3)";
        $element.classList.add("opacityOn");
        // const file = e.target.files[0];
        // console.log(input);
        const file = formData.get(input.name); //nombre del archivo
        const image = URL.createObjectURL(file);

        //Removiendo el Label

        let $icono = $image.nextElementSibling;
        let $span = $icono.nextElementSibling;

        $icono.style.visibility = "hidden";
        $span.style.visibility = "hidden";
        $image.style.visibility = "visible";
        $image.src = image;
    }

    //?Al cambiar cada imagen, previsualizarla llamando a renderImages
    $inputsImage.forEach(input => {
        input.addEventListener("change", (event) => {
            let formData = new FormData($formPost);
            // console.log(formData) //return object formData
            renderImages(formData, input);
        })
    })

    $formPost.addEventListener("submit", async (event) => {
        event.preventDefault();
        let formData = new FormData($formPost); //return object formData

        //Mando el Post al backend y lo proceso alla
        let response = await fetch('/gatitos', {
            method: 'POST',
            body: formData,
        })

        //transition
        let result = response.json()
        alert(result)

        hideModalByButtonPost();
    })
    //!Desarrollar desde aca, 9:17 formdata leyendo y enviando archivos al server

}


const $modal = document.querySelector(".modalPost")
const $modalContainer = document.querySelector(".modalPost__container");

const hideModalByCross = () => {
    const $cross = document.querySelector(".modalPost__cross");
    $cross.addEventListener("click", (event) => {
        $modal.classList.add("close-modalPost");
        $modalContainer.classList.add("close-modalPost__container");
        setTimeout(() => {
            $modal.style.display = "none";
        }, 450)
        // window.location.href = '/';
    })
}
hideModalByCross();

//!POR QUE NO DESAPARECE AL POSTEAR
const hideModalByButtonPost = () => {
    const $postearButton = document.querySelector("#sendPost");
    $postearButton.addEventListener("click", (e) => {
        $modal.classList.add("close-modalPost");
        $modalContainer.classList.add("close-modalPost__container");
        setTimeout(() => {
            $modal.style.display = "none";
        }, 450)
    })
}
const showModal = () => {
    const $buttonPost = document.querySelector(".buttonPost");
    $buttonPost.addEventListener("click", (event) => {
        $modal.style.display = "flex";
        $modal.classList.add('visible');

    })
}
showModal();

const getValidate = () => {
    const $sendPost = document.querySelector('#sendPost');

    $sendPost.addEventListener('click', () => {
        // validarPost();
        hideModalByButtonPost();
    })
}

getValidate()

export { formPost };