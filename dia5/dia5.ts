// Dia 5

/**
 *
 * Lo hecho en el Dia2 con nuevas reglas para el programa que analiza los codigos de entrada
 * Reglas anteriores:
 * 1- suma, lo que haya en la posicion que indique su siguiente num, con el num de la posicion del siguiente a este, lo almacena en la posicion indicada en el siguiente
 * 2- lo mismo pero multiplicando
 * 99- se detiene
 *
 * Ejercicio 1
 *
 * Ya no tienen por qué avanzar de 4 en 4.
 * Si la instrucción es 3, su numero inmediato es el parametro de entrada, y avanza 2 el puntero
 * Si la instrucción es 4, su numero inmediato es el parametro de salida (se imprime por consola), y avanza 2
 *
 * Ahora hay MODOS DE PARAMETRO:
 * 0 (o vacio): funciona como antes, los valores de los parametros que consume la instrucción son los indicados por la POSICIÓN que indican estos
 * 1: ahora los valores de los parametros que consume, son el propio valor DIRECTO de los parámetros
 *
 * Esto se indica en la propia instrucción así:
 * ABCDE
 *  1002
 *
 * DE = Instrucción (02 es multiplicación)
 * C = Modo de parametro del primer parametro (0 es posición)
 * B = Modo de parametro del segundo parametro (1 es posición)
 * A = Modo de parametro del tercer parametro (vacio es posición)
 *
 * Los parametros de una instruccion que escribe siempre estaran en modo POSICIÓN
 *
 * Una vez ejecutado el programa genera (se vera en la consola por la instruccion 4) un cero por cada instruccion correcta y un 'código de diagnostico'
 * La respuesta al Ej1 es este código
 *
 * codigo de entrada inicial = 1
 *
 * Ejercicio 2
 *
 *  Se aporta nueva entrada inicial = 5
 * 4 nuevos codigos de instruccion:
 * 5: Si el primer parametro es distinto de 0, el puntero de instrucion toma el valor del segundo parametro
 * 6: Si el primer parametro es igual a 0, el puntero de instrucion toma el valor del segundo parametro
 * 7: Si el primer parametro es menor que el segundo escribe 1 en la posicion del tercer parametro, si no escribe 0
 * 8: Si el primer parametro es igual que el segundo escribe 1 en la posicion del tercer parametro, si no escribe 0
 */

import { AnalizadorIntCode } from "./analizadorIntCode";
import { codigosEntrada, codigosPrueba } from "./codigosEntrada";

class Dia5 extends AnalizadorIntCode {
  constructor(entradaInicial) {
    super(entradaInicial, codigosEntrada);
  }
}

let entradaEj1: number = 1;
let entradaEj2: number = 5;
let Ejercicio1 = new Dia5(entradaEj1);
let Ejercicio2 = new Dia5(entradaEj2);
