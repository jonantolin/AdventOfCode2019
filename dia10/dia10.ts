// Dia 10

/**
 *
 * Ejercicio1:
 *
 * Dado un plano con puntos (.) y almohadillas (#) donde # representan asteroides,
 * encontrar el asteroide desde el que más asteroides son visibles.
 *
 * Un asteroide que es visible para otro, puede tener detrás en la misma linea de
 * visión otros asteroides que no serian visibles.
 *
 * Los asteroides pueden estar en cualquier ángulo, no solo en horizontal, vertical y diagonal.
 */

/*
    Nota: 

    Pendiente de una recta dados dos puntos: 

    m = y2 - y1 / x2 - x1

    Por logica, tomando un asteroide origen y recorriendo todo el array de asteroides destino, 
    en todas las pendientes diferentes hay 1 o 2 asteroides visibles, dependiendo si estan,
    mas arriba o abajo del asteroide origen
 */

/**
 * Ejercicio 2:
 *
 * Sabiendo el asteroide óptimo que más asteroides ve, se coloca un láser en él que ira destruyendo asteroides.
 * Si el láser/asteroide fuera el centro de un reloj de manecillas,
 * destruye aquellos asteroides que tiene visibles, empezando desde las 12 y girando en sentido horario.
 *
 */
/*

    Nota: 

    Siendo el punto central el asteroide origen, en cada cuadrante a partir de el,
    puede haber pendientes iguales, si hay varias iguales. En cada rotacion se eliminaria 1.

*/

import { AnalizadorAsteroides } from "./analizadorAsteroides";

class Dia10 {
  // TODO

  constructor() {
    let dia10 = new AnalizadorAsteroides();
  }
}

let prueba = new Dia10();
