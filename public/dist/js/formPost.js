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
        const file = formData.get(input.name);
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
            const formData = new FormData($formPost); //return object formData
            renderImages(formData, input);
        })
    })

    $formPost.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData($formPost); //return object formData
        renderImages(formData)
    })
    //!Desarrollar desde aca, 9:17 formdata leyendo y enviando archivos al server

}

const $modal = document.querySelector(".modalPost")
const $modalContainer = document.querySelector(".modalPost__container");
const hideModal = () => {
    const $cross = document.querySelector(".modalPost__cross");
    $cross.addEventListener("click", (event) => {
        $modal.classList.add("close-modalPost");
        $modalContainer.classList.add("close-modalPost__container");
        setTimeout(() => {
            $modal.style.display = "none";
        }, 450)
    })
}
hideModal();

const showModal = () => {
    const $buttonPost = document.querySelector(".buttonPost");
    $buttonPost.addEventListener("click", (event) => {
        $modal.style.display = "block";
        $modal.classList.add('visible');

    })
}
showModal();
export { formPost };