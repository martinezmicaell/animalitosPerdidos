//Al llegar al ultimo elemento renderizado en el Paginado, se detecta con Oberserver y al detectarlo, se hace una request al server de la siguiente pagina

const requestTarget = document.querySelector("#request-target")
const containerCats = document.querySelector(".containerCats");
let LastElement = containerCats.lastElementChild;
// https://randomuser.me/api/?results=10

let apiUrl = "/test?page=1&limit=8"
loading = false;

const intersectionOptions = {
    root: null,
    rootMargin: "100% 0% 100% 0%",
    threshold: 0.6
};


const onIntersect = ([entry]) => {
    if (apiUrl && !loading && entry.isIntersecting) {
        console.warn("Algo esta intersectando con la ventana")
        makeRequest()
    }
}

const makeRequest = () => {
    loading = true;
    console.log('hola')
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            // console.log(data.next.urlNext)
            if (!data.next) {
                console.log("No hay mas gatitos perdidos en la pagina")
            } else {
                cleanUp(data.next.urlNext)
                const ultimoPost = renderItems(data.results)
                // console.log(ultimoPost)
                LastElement = ultimoPost;
                console.log(LastElement)
                observer.observe(LastElement)
                // cleanUp(`http://localhost:3000/?page=${posts.next}`)
            }






        });
}

const cleanUp = nextPage => {
    apiUrl = nextPage;
    loading = false;


}

const renderItems = results => {
    results.forEach(post => {
        containerCats.appendChild(createPost(post));
        console.log(post)
        //Al ultimo item del render, asignarle el Observer
    })

    return containerCats.lastElementChild;
}


const createPost = post => {
    const newPost = document.createElement("div");
    newPost.classList.add("containerCats_element");
    newPost.innerHTML = `
    <figure class="containerCats_imgContainer" tabindex="">
                            <!-- add carousel -->
                            <div class="carousel" data-carousel>
                                <button class="carousel-button prev" data-carousel-button="prev">&#60;</button>
                                <button class="carousel-button next" data-carousel-button="next">&#62;</button>
                                <ul data-slides>
                                    <li class="slide" data-active>
                                        <img class="containerCats_img" loading="lazy" src="${post.img.url}" alt="">
                                    </li>
                                    <li class="slide">
                                        <img class="containerCats_img" loading="lazy" src="${post.img2.url}" alt="">
                                    </li>
                                    <li class="slide">
                                        <img class="containerCats_img" loading="lazy" src="${post.img3.url}" alt="">
                                    </li>
                                </ul>
                            </div>

                            <!-- fin carrousel -->

                        </figure>
                        <div class="containerCats_container">
                            <div class="containerCats_wrapperInitial">
                                <h3 class="containerCats_name">
                                    ${post.name}
                                </h3>
                                <p class="containerCats_description">
                                    ${post.desc}
                                </p>
                                <button class="containerCats_buttonFound">Lo encontraste?</button>
                            </div>
                            <div class="containerCats_wrapperFinish">
                                <div class="containerCats_contact">
                                    <div class="containerCats_contactCross">
                                        <img class="containerCats_contactCrossImg"
                                            src="./dist/img/icons/cross-bground.svg" alt="">
                                    </div>
                                    <h2 class="containerCats_contactH2"><span
                                            class="containerCats_contactSpan1">Contacta a los dueños!</span><span
                                            class="containerCats_contactSpan2">Ellos te lo agradecerán 😄</span> </h2>
                                    <div class="social">
                                        <a class="containerCats_whatsapp"
                                            href="https://api.whatsapp.com/send?phone=${post.phone}"
                                            target="_blank">
                                            <img loading="lazy" src="./dist/img/icons/whatsapp.svg" alt="">
                                        </a>
                                        <p class="containerCats_phone">
                                            ${post.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;
    return newPost;
}


const observer = new IntersectionObserver(onIntersect, intersectionOptions)

observer.observe(LastElement)
