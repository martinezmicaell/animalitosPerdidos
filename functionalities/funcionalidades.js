
//? Se ordean el array con sort() pero usando algo de aleatoriedad con Math.random(), y se usa el 0.5 para asegurar que cada vez que llamamos al algoritmo, el valor de lo aleatorio sea positivo o negativo

//https://www.delftstack.com/es/howto/javascript/shuffle-array-javascript/


function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
}

//$Esto me va a servir para hacer un Array de objetos cuando quiera renderizar los POST de forma Random
var demoArray = [1, 3, 5];
shuffleArray(demoArray);
console.log(demoArray);

let random = Math.random() - 0.5;
console.log(random)