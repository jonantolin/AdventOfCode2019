console.log("Hola,mundo");

//Ejercicio 1 // 3358992

// Obtener el combustible total necesario.
// De cada masa (array de masas), dividir entre 3, redondear hacia abajo y restar 2, se obtiene el combustible necesario
// sumar cada una de las cantidades de combustible

// Ejercicio 2 // 5035632

// De cada elemento calculado en el ejercicio 1 (combustible de cada modulo) a su vez calcular el combustible necesario de la misma forma,
// del resultado, obtener de nuevo lo mismo,

const masasEj1: number[] = [
  68884,
  100920,
  114424,
  139735,
  103685,
  133067,
  77650,
  77695,
  85927,
  108144,
  131312,
  97795,
  83234,
  61637,
  137735,
  126903,
  71037,
  58593,
  54510,
  66117,
  54164,
  60761,
  128623,
  52359,
  55458,
  145494,
  57319,
  98478,
  110008,
  86620,
  103271,
  86924,
  116773,
  87534,
  102462,
  119945,
  126017,
  84706,
  129840,
  97831,
  136000,
  79667,
  133831,
  92793,
  148917,
  75262,
  129853,
  60513,
  89914,
  79584,
  64229,
  124145,
  127684,
  142628,
  52734,
  130649,
  87191,
  126500,
  137058,
  109782,
  108641,
  102147,
  132881,
  119065,
  58999,
  62462,
  105232,
  79743,
  127994,
  143392,
  61072,
  59375,
  57361,
  128021,
  101544,
  135661,
  135469,
  51693,
  103286,
  146654,
  97886,
  133910,
  71306,
  147224,
  73771,
  91292,
  116892,
  116906,
  107424,
  68283,
  100285,
  105709,
  120370,
  92931,
  146706,
  131745,
  101710,
  85089,
  98788,
  116232
];

let combustibleTotalEj1: number;
let combustibleTotalEj2: number;

// Ejercicio 1
combustibleTotalEj1 = masasEj1
  .map(masa => Math.floor(masa / 3 - 2))
  .reduce((a, b) => a + b);

// Ejercicio 2
combustibleTotalEj2 = masasEj1
  .map(masa => {
    let combustibleModulo = 0;

    while (masa > 0) {
      masa = Math.floor(masa / 3 - 2);
      if (masa > 0) {
        combustibleModulo += masa;
      }
    }
    return combustibleModulo;
  })
  .reduce((a, b) => a + b);

console.log(combustibleTotalEj1);
console.log(combustibleTotalEj2);
