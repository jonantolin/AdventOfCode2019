// Dia 2

// Ejercicio 1
// Que codigo/numero tiene la posicion 0 al finalizar el programa??
/*
Reglas: 1, 2 o 99
1- suma, lo que haya en la posicion que indique su siguiente num, con el num de la posicion del siguiente a este, lo almacena en la posicion indicada en el siguiente
2- lo mismo pero multiplicando
99- se detiene

*/

const codigosAlarma: number[] = [
  1,
  0, //12
  0, //2
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  1,
  10,
  19,
  1,
  6,
  19,
  23,
  2,
  23,
  6,
  27,
  2,
  6,
  27,
  31,
  2,
  13,
  31,
  35,
  1,
  10,
  35,
  39,
  2,
  39,
  13,
  43,
  1,
  43,
  13,
  47,
  1,
  6,
  47,
  51,
  1,
  10,
  51,
  55,
  2,
  55,
  6,
  59,
  1,
  5,
  59,
  63,
  2,
  9,
  63,
  67,
  1,
  6,
  67,
  71,
  2,
  9,
  71,
  75,
  1,
  6,
  75,
  79,
  2,
  79,
  13,
  83,
  1,
  83,
  10,
  87,
  1,
  13,
  87,
  91,
  1,
  91,
  10,
  95,
  2,
  9,
  95,
  99,
  1,
  5,
  99,
  103,
  2,
  10,
  103,
  107,
  1,
  107,
  2,
  111,
  1,
  111,
  5,
  0,
  99,
  2,
  14,
  0,
  0
];

let arrayResultadoEj1: number[];
let arrayResultadoEj2: number[];
let resultado2: number = 0; //100 * sustantivo + verbo;
const numBuscado: number = 19690720;

/**
 * EJERCICIO 1
 */

arrayResultadoEj1 = codigosAlarma.slice(0);

arrayResultadoEj1[1] = 12;
arrayResultadoEj1[2] = 2;

for (let i = 0; i < arrayResultadoEj1.length - 4; i += 4) {
  let entrada1 = arrayResultadoEj1[i + 1];
  let entrada2 = arrayResultadoEj1[i + 2];
  let posicionSalida = arrayResultadoEj1[i + 3];

  if (arrayResultadoEj1[i] == 99) {
    break;
  }

  switch (arrayResultadoEj1[i]) {
    case 1:
      arrayResultadoEj1[posicionSalida] =
        arrayResultadoEj1[entrada1] + arrayResultadoEj1[entrada2];
      break;
    case 2:
      arrayResultadoEj1[posicionSalida] =
        arrayResultadoEj1[entrada1] * arrayResultadoEj1[entrada2];
      break;

    default:
      break;
  }
}

//console.log("%o", arrayResultadoEj1);
console.log("Respuesta Ej1 -> %o", arrayResultadoEj1[0]);

/**
 * EJERCICIO 2
 *
 * En el anterior ejercicio se sustituia la posicion 1 y 2 del array original por 12 y 2 respectivamente.
 * Hay que encontrar que valores darian como salida(arrayResultadoEj2[0]) 19690720
 * La posicion 1 se le llama "sustantivo" y a la posicion 2 "verbo".
 * La respuesta al ejercicio 2 es: 100 * sustantivo + verbo
 */

arrayResultadoEj2 = codigosAlarma.slice(0);

for (let sustantivo = 0; sustantivo < 100; sustantivo++) {
  for (let verbo = 0; verbo < 100; verbo++) {
    arrayResultadoEj2 = codigosAlarma.slice(0); // Cada nuevos datos de entrada reinicio el array a sus valores originales
    arrayResultadoEj2[1] = sustantivo;
    arrayResultadoEj2[2] = verbo;
    for (let i = 0; i < arrayResultadoEj2.length; i += 4) {
      let entrada1 = arrayResultadoEj2[i + 1];
      let entrada2 = arrayResultadoEj2[i + 2];
      let posicionSalida = arrayResultadoEj2[i + 3];

      if (arrayResultadoEj2[i] == 99) {
        break;
      }

      switch (arrayResultadoEj2[i]) {
        case 1:
          arrayResultadoEj2[posicionSalida] =
            arrayResultadoEj2[entrada1] + arrayResultadoEj2[entrada2];
          break;
        case 2:
          arrayResultadoEj2[posicionSalida] =
            arrayResultadoEj2[entrada1] * arrayResultadoEj2[entrada2];
          break;

        default:
          break;
      }
    }

    if (arrayResultadoEj2[0] == numBuscado) {
      resultado2 = 100 * sustantivo + verbo;
      console.log("arrayResultadoEj2[0] -> %o", arrayResultadoEj2[0]);
      console.log("verbo encontrado -> %o", verbo);
      console.log("sustantivo encontrado -> %o", sustantivo);
      console.log("Respuesta Ej2 -> %o", resultado2);
      console.log("Respuesta ssssss -> %o", [3, 5, 7, 4]);
    }
  }
}
