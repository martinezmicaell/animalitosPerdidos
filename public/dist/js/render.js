import { formPost } from './formPost.js';


//?Verificar si es de Villa Regina, si no mostrar el modal "Actualmente Animalitos Perdidos es apta para la ciudad de Villa Regina, lo sentimos :(";


formPost();

//$Por cada button de cada animal "Lo encontraste?"
const clickInPerdido = () => {
    const ButtonFound = document.querySelectorAll(".containerCats_buttonFound");
    console.log(ButtonFound);

    ButtonFound.forEach((button) => {
        //*Add function anonima swapText(e)
        button.addEventListener("click", (e) => {
            let button = e.target;
            let WrapperInitial = button.parentNode;
            let WrapperFinish = WrapperInitial.nextElementSibling;
            console.log(WrapperInitial); //retorna el cointainerCats_wrapper
            console.log(WrapperFinish);
            WrapperInitial.style.display = "none";
            WrapperFinish.style.display = "flex";
            WrapperFinish.innerHTML = `
            <div class="containerCats_contact">
                <div class="containerCats_contactCross">
                    <img class="containerCats_contactCrossImg" src="./dist/img/icons/cross-bground.svg" alt="">
                </div>
                <h2 class="containerCats_contactH2"><span class="containerCats_contactSpan1">Contacta a los dueños!</span><span class="containerCats_contactSpan2">Ellos te lo agradecerán 😄</span> </h2>
                <div class="social">
                    <a class="containerCats_whatsapp" href="https://api.whatsapp.com/send?phone=+542984279430" target="_blank">
                        <img src="./dist/img/icons/whatsapp.svg" alt="">
                    </a>
                    <p class="containerCats_phone">+54 2984734813</p>
                </div>
            </div>
            `;

            clickInCross();
            //?Podria agregar un efecto de transicion de desaparecer

            //?Podria agregar un efecto de transicion al aparecer
        })
    })
}

//?Por que desaparece ala 2da vez
const clickInCross = () => {
    const Cross = document.querySelectorAll('.containerCats_contactCross');
    console.log(Cross);
    Cross.forEach(cross => {
        cross.addEventListener("click", (e) => {
            let cross = e.target;
            let wrapperFinish = cross.parentNode.parentNode.parentNode;
            let WrapperInit = cross.parentNode.parentNode.parentNode.previousElementSibling;
            wrapperFinish.style.display = "none";
            WrapperInit.style.display = "flex";
        })
    })
}


const addContactElement = () => {

}

//* Llega los datos desde mi API, filtro por perritos desde la bdd
function renderPerritos(miApi) {

}

//* Llega los datos desde mi API, filtro por gatitos desde la bdd
function renderGatitos(miApi) {

}





//?Events
clickInPerdido();
addContactElement();


