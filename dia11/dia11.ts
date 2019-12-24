// Dia 11

/**
 * Un robot que se mueve por un tablero y va pintando bloques (posiciones).
 * Todos los bloques son negros al principio.
 * Utiliza el AnalizadorIntCode para saber como moverse y de que color pintar los bloques.
 * Si se encuentra en un bloque negro se le da la instruccion de entrada -> 0
 * Si se encuentra en un bloque negro se le da la instruccion de entrada -> 1
 *
 * Entonces el Analizador devolverá 2 salidas:
 *
 * La primera salida -> indica de que color pintar el bloque en el que está (0 - negro, 1 - blanco)
 * La segunda salida -> indica en que sentido se gira el robot ( 0 - 90 grados a la izquierda, 1 - 90 grados derecha)
 *
 * Tras esto, avanza 1 posicion en la direccion a la que mira.
 * El robot empieza mirando hacia arriba (0 grados)
 * Llegará un momento en el que se pare.
 *
 * Ejercicio 1:
 *
 * Determinar cuantos bloques pintará al menos una vez.
 *
 * Ejercicio 2:
 *
 * Descubir el código (8 letras mayúsculas) que pinta sobre el tablero,
 * si empieza desde un bloque blanco
 */

import { codigosEntrada } from "./codigosEntrada";
import { AnalizadorModificado } from "./AnalizadorModificado";

class Dia11 {
  public entradaInicialEj1 = 0;
  public entradaInicialEj2 = 1;
  constructor() {
    let ejercicio1 = new AnalizadorModificado(
      this.entradaInicialEj1,
      codigosEntrada
    );
    let ejercicio2 = new AnalizadorModificado(
      this.entradaInicialEj2,
      codigosEntrada
    );
  }
}

let prueba = new Dia11();
