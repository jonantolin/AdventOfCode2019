// Dia 4

const rangoInicio: number = 153517;
const rangoFin: number = 630395;

/**
 * Ejercicio 1
 *
 * Hallar el número de contraseñas posibles que cumplan los siguientes criterios
 *
 * Es un número de seis dígitos.
 * El valor está dentro del rango dado: 153517-630395.
 * Dos dígitos adyacentes son iguales (como 22 en 122345).
 * Yendo de izquierda a derecha, los dígitos nunca disminuyen; solo aumentan o permanecen iguales (como 111123 o 135679).
 */

let rangoInicioEj1 = rangoInicio;

let numPosiblesEj1: number = 0;
let numPosiblesEj2: number = 0;

let isAscendente: Function = (array: string[]): boolean => {
  let ascendente: boolean = false;

  let contador: number = 0;
  do {
    if (array[contador + 1] >= array[contador]) {
      ascendente = true;
    } else {
      ascendente = false;
      break;
    }
    contador++;
  } while (contador < array.length - 1);

  return ascendente;
};

while (rangoInicioEj1 <= rangoFin) {
  let sActual: string = rangoInicioEj1.toString();
  let arrayNumsActual: string[] = Array.from(sActual);

  let adyacentesIguales: boolean = false;

  let ascendente = isAscendente(arrayNumsActual);

  if (ascendente) {
    arrayNumsActual.map((digito, index, arr) => {
      if (digito === arr[index + 1]) {
        adyacentesIguales = true;
      }
    });
  }

  if (adyacentesIguales && ascendente) {
    numPosiblesEj1++;
  }

  rangoInicioEj1++;
}

console.log("Respuesta Ej1 -> " + numPosiblesEj1);

/**
 * Ejercicio 2
 *
 * Un nuevo criterio se suma a las reglas del Ejercicio 1:
 *
 * En el numero debe haber al menos 1 pareja de digitos adyacentes repetidos sin que formen un trio, cuarteto, etc.
 *
 * Por ejemplo:
 *
 * 112233 -> SI cumple el criterio
 * 123444 -> NO cumple el criterio, porque 4 forma un trio y no existe ninguna pareja
 * 122444 -> SI cumple el criterio, porque hay una pareja de 2 (da igual el 4)
 * 144488 -> SI cumple el criterio, porque hay una pareja de 8
 */

let rangoInicioEj2 = rangoInicio;

while (rangoInicioEj2 <= rangoFin) {
  let sActual: string = rangoInicioEj2.toString();
  let arrayNumsActual: string[] = Array.from(sActual);

  if (isAscendente(arrayNumsActual)) {
    let parejas: boolean = false;
    let numPareja: string = "";

    arrayNumsActual.map((digito, index, arr) => {
      if (digito === arr[index + 1] && !parejas) {
        parejas = true;
        numPareja = digito;

        let cantNumAdyacente: string[] = arrayNumsActual.filter(
          num => num === numPareja
        );

        if (cantNumAdyacente.length > 2) {
          parejas = false;
        }
      }
    });
    if (parejas) {
      numPosiblesEj2++;
    }
  }

  rangoInicioEj2++;
}

console.log("Respuesta Ej2 -> " + numPosiblesEj2);
