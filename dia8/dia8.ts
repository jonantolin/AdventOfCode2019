// Dia 8

/**
 * Debo descodificar una imagen a partir de un gigantesco codigo de digitos.
 * Cada digito leido de izquierda a derecha y de abajo a arriba, representa un pixel.
 * Cada imagen esta dividida en capas de identico tamaño que se rellenaran segun el tamaño de imagen.
 * 
 * Por ejemplo una imagen 3x2  si lo datos de imagen son: 123456789012 se rellenara así: 
 * 
 * Capa 1: 123
           456

   Capa 2: 789
           012

    Ejercicio 1: 
    
    la imagen a descodificar tiene un tamaño de 25x6 . 

    El objetivo del Ej 1 es encontrar la capa que tiene la MENOR cantidad de digitos '0',
    y en esa capa hallar el numero de digitos '1' multiplicado por el numero de digitos '2' 


    Ejercicio 2: 

    Formar la imagen generando una capa final, mezcla de todas las anteriores.
    La capa de arriba es la primera del array de capas, y la de abajo del todo la última.
    0: pixel negro
    1: pixel blanco
    2: pixel transparente
 */

import { CalculadoresCapas } from "./calculadoresCapas";

class Dia8 extends CalculadoresCapas {
  constructor() {
    super();
    this.arrayFilas = this.agruparEnFilas();
    this.arrayCapas = this.agruparEnCapas(this.arrayFilas);
    //Ej 1
    this.responderEj1();

    //Ej 2
    this.descodificarImagen();
  }
}

let prueba = new Dia8();
