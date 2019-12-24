// Dia 13

/**
 * Se utiliza el AnalizadorIntCode para crear un juego parecido al típico
 * de la bolita rompiendo bloques.
 *
 * El AnalizadorIntCode devuelve salidas de 3 en 3 antes de detenerse.
 * Las salidas 'pintan' la configuración del tablero.
 * La salida 1: indica posicion X
 * La salida 2: indica posicion Y
 * La salida 3: indica tipo de bloque en la posicion (X, Y) de las salidas anteriores
 *
 *  La salida 3 tiene varios valores posibles:
 *  - valor 0: No hay nada.
 *  - valor 1: Es un azulejo de la pared. Indestructible.
 *  - valor 2: Es un bloque rompible.
 *  - valor 3: Es un azulejo horizontal indestructible.
 *  - valor 4: La bola. Se mueve en diagonal y rebota en los bloques (los rompa o no)
 *
 * Ejercicio 1:
 * Determinar cuántos bloques (valor 2) hay en la pantalla cuando sale el juego
 *
 * Ejercicio 2:
 * Estableciendo la posicion[0] a 2, jugar al juego y responder con la puntuación obtenida.
 * La bola ira rebotando en los distintos objetos. Las instrucciones de entrada serán las determinadas
 * según la dirección del 'joystick' en cada momento. Es decir, tengo que proporcionar la dirección a la
 * que se mueve el joystick (para que la bola rebote y vuelva hacia arriba) en el momento que me pide una instrucción de entrada
 * de tal manera que lleguen a romperse todos los bloques (azulejo tipo 2).
 *
 * Direccion del joystick:
 *
 * posicion neutral: 0
 * inclinado hacia la izq: -1
 * inclinado hacia la drch: 1
 *
 * El programa generará instrucciones de salida de 3 en 3, pero esta vez la salida num 3,
 * es la puntuación del jugador en ese momento.
 *
 * Tengo que dar la puntuación obtenida justo tras romper el último de los bloques.
 *
 *
 */

import { codigosEntrada } from "./codigosEntrada";
import { AnalizadorModificado } from "./analizadorModificado";
class Dia13 {
  //TODO
  constructor() {
    let ejercicio1 = new AnalizadorModificado(0, codigosEntrada);
  }
}

let prueba = new Dia13();
