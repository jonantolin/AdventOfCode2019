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
 * 4 nuevos codigos de instruccion
 */

import { codigosEntrada, codigosPrueba } from "./codigosEntrada";

class Dia5 {
  // copia de los codigos proporcionados
  public codigosCopia: number[] = codigosEntrada.slice(0);
  //public codigosCopia: number[] = codigosPrueba.slice(0);

  // Ej1
  public ENTRADA_INICIAL: number = 5;
  public entradaElegida = this.ENTRADA_INICIAL;

  constructor() {
    let contador: number = 0;

    while (
      contador < this.codigosCopia.length &&
      this.codigosCopia[contador] != undefined
    ) {
      //console.log("contador -> %o", contador);
      let instruccion = Math.abs(this.codigosCopia[contador]).toString();

      // 01 ó 02 ó 03 ó 04 ...
      let codInstruccion = instruccion.slice(-1);

      let param1 = this.codigosCopia[contador + 1];
      let param2 = this.codigosCopia[contador + 2];
      let salida = this.codigosCopia[contador + 3];

      let modo1 = 0;
      let modo2 = 0;

      modo1 = +instruccion.toString().slice(-3, -2);
      modo2 = +instruccion.toString().slice(-4, -3);

      let param1ConModo = this.segunModo(modo1, param1);
      let param2ConModo = this.segunModo(modo2, param2);

      if (instruccion.slice(-2) == "99") {
        console.log("programa detenido");
        break;
      }

      switch (codInstruccion) {
        case "1":
          this.instruccion1(param1ConModo, param2ConModo, salida);
          contador += 4;
          break;
        case "2":
          this.instruccion2(param1ConModo, param2ConModo, salida);
          contador += 4;
          break;
        case "3":
          this.instruccion3(this.entradaElegida, param1);
          contador += 2;
          break;
        case "4":
          this.instruccion4(param1);
          contador += 2;
          break;

        case "5":
          //console.log("cincooo");
          contador = this.instruccion5(param1ConModo, param2ConModo, contador);
          break;
        case "6":
          contador = this.instruccion6(param1ConModo, param2ConModo, contador);
          break;

        case "7":
          console.log("sieete");
          this.instruccion7(param1ConModo, param2ConModo, salida);
          contador += 4;
          break;

        case "8":
          console.log("ocho");
          this.instruccion8(param1ConModo, param2ConModo, salida);
          contador += 4;
          break;
        default:
          //esto seria un error
          contador += 9999;
          break;
      }

      //contador++;
    }
    // TODO
  }

  public segunModo = (modo, valor) => {
    if (modo == 0) {
      return this.codigosCopia[valor];
    } else if (modo == 1) {
      return valor;
    }
  };

  public instruccion1 = (param1, param2, salida) => {
    this.codigosCopia[salida] = param1 + param2;
  };

  public instruccion2 = (param1, param2, salida) => {
    this.codigosCopia[salida] = param1 * param2;
  };

  public instruccion3 = (entradaElegida, param1) => {
    this.codigosCopia[param1] = entradaElegida;
  };

  public instruccion4 = param1 => {
    console.log("salida -> %o", this.codigosCopia[param1]);
  };

  // nuevas instrucciones Ej 2

  public instruccion5 = (param1, param2, contador): number => {
    let cont = contador;
    //cont += 2;
    if (param1 != 0) {
      cont = this.codigosCopia.findIndex(elem => elem == param2);
      //cont = this.codigosCopia[param2];
    }
    return cont;
  };

  public instruccion6 = (param1, param2, contador): number => {
    contador += 2;
    if (param1 == 0) {
      contador = this.codigosCopia.findIndex(elem => elem == param2);
    }
    return contador;
  };

  public instruccion7 = (param1, param2, salida) => {
    if (param1 < param2) {
      this.codigosCopia[salida] = 1;
    } else {
      this.codigosCopia[salida] = 0;
    }
  };

  public instruccion8 = (param1, param2, salida) => {
    if (param1 == param2) {
      this.codigosCopia[salida] = 1;
    } else {
      this.codigosCopia[salida] = 0;
    }
  };
}

let prueba1 = new Dia5();
