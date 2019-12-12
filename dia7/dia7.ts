// Dia 7

/**
 * Ejercicio 1:
 *
 * Se usara el programa actual de IntCodes (Dia 5).
 *
 * Existen 5 amplificadores en orden (A, B, C, D, E). A conecta con B, B con C...
 *
 *
 * Cada amplificador recibe una señal de entrada del amplificador anterior (en caso de A es 0).
 * Cada amplificador emite una señal se salida para el amplificador siguiente.
 * Cada amplificador recibe una señal de entrada (SEÑAL DE FASE), la PRIMERA que pedira el programa IntCodes del amplificador
 * Esta SEÑAL DE FASE es un numero entre 0-4 (0, 1, 2, 3, 4), el numero que use SOLO SE USA ESA VEZ, es decir no se usara en otros amplificadores
 * Cada amplificador recibira una SEGUNDA señal de entrada, que es la señal de salida del amplificador anterior (ó 0 en caso de A).
 * El último 'E', manda una señal de salida a los propulsores.
 *
 * Según la señal de fase usada, el amplificador E emitira una señal distinta.
 *
 * Hay que obtener la señal mas alta entre todas las posibles señales de fase usadas.
 *
 * Ejemplo 1:
 *
 * codigosPrueba: 3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0
 *
 * Las señales de fase usadas correctas para la señal mas alta (un num por cada ampli, en orden): [4,3,2,1,0]
 *
 * La señal mas alta: 43210
 *
 * Ejercicio 2:
 *
 * Ahora el programa tiene las siguientes modificaciones:
 *
 * La señal de fase es un numero entre 5-9 (5, 6, 7, 8, 9).
 * Esto provoca que el programa (en cada amplificador?) reciba y genere muchas señales de entrada y salida.
 * El ultimo ampli E ahora vuelve a conectarse con el primero A enviandole su señal de salida (que antes iba hacia los propulsores).
 * Ahora el array codigosEntrada (los codigos) no se reinicia en cada amplificador si no que se transforma en cada ampli y se manda al siguiente sin reiniciarlo.
 * Llega un momento en el que el programa se detendrá despues de procesar el bucle final, en ese momento la señal de salida del ampli E se manda a los propulsores.
 * La respuesta al Ej2 es la senal maxima de salida de entre todas las combinaciones de fase posibles
 *
 *
 */

import {
  codigosEntrada,
  codigosPruebaEj1,
  codigosPruebaEj2
} from "./codigosControladorAmplificador";
import { AnalizadorIntCode } from "./analizadorIntCode";

class Dia7 {
  public senalEntrada: number = 0;
  public ampliIntCode: AnalizadorIntCode;
  public senalesFaseEj1: number[] = [0, 1, 2, 3, 4];
  public posiblesSenalesFase: Array<number>[];
  public senalesHaciaPropulsores: number[] = [];

  public codigosUsados: number[] = [];

  // Respuesta Ej1
  public potenciaMaximaPropulsores: number;

  // Ejercicio 2
  public senalesFaseEj2: number[] = [5, 6, 7, 8, 9];

  constructor() {
    // PRUEBAS

    this.calcularEj1();
    //this.calcularEj2();
  }

  public calcularEj1 = () => {
    this.codigosUsados = codigosEntrada;
    this.posiblesSenalesFase = this.permutador(this.senalesFaseEj1);

    this.posiblesSenalesFase.map(grupoFase => {
      let senalEntrada = grupoFase[0];
      let senalAmpli = 0;

      let ampliActual = 0;
      let senalSalida = senalAmpli;

      //el numero de amplificadores coincide con el numero de senales fase
      while (ampliActual < this.senalesFaseEj1.length) {
        senalEntrada = grupoFase[ampliActual];
        this.ampliIntCode = new AnalizadorIntCode(
          senalEntrada,
          senalSalida,
          this.codigosUsados
        );
        senalSalida = this.ampliIntCode.emitirSenalAmpli();
        //console.log("senal salida ampli -> %o", senalSalida);

        ampliActual++;
      }

      // guardara la salida que en esta linea sera la del ultimo ampli,
      // Es decir, la que va hacia los propulsores
      this.senalesHaciaPropulsores.push(senalSalida);
    });

    // Respuesta Ej 1
    this.potenciaMaximaPropulsores = Math.max(...this.senalesHaciaPropulsores);

    console.log("Respuesta Ej 1 -> %o", this.potenciaMaximaPropulsores);
  };

  public calcularEj2 = () => {
    this.codigosUsados = codigosPruebaEj2;
    this.posiblesSenalesFase = this.permutador(this.senalesFaseEj2);

    //Prueba
    //let senalesFaseEj2: number[] = [5, 6, 7, 8, 9];

    //this.posiblesSenalesFase.map(grupoFase => {
    //Prueba
    let senalesFaseEj2: number[] = [9, 8, 7, 6, 5];
    let senalEntrada = senalesFaseEj2[0];
    let senalAmpli = 0;

    let ampliActual = 0;
    let senalSalida = senalAmpli;

    let contadorTotal = 0;

    //el numero de amplificadores coincide con el numero de senales fase

    while (ampliActual < this.senalesFaseEj2.length) {
      senalEntrada = senalesFaseEj2[ampliActual];

      //if (contadorTotal > 4) {
      //senalEntrada = senalSalida;
      //}
      this.ampliIntCode = new AnalizadorIntCode(
        senalEntrada,
        senalSalida,
        this.codigosUsados
      );
      senalSalida = this.ampliIntCode.emitirSenalAmpli();
      console.log("senal salida ampli -> %o", senalSalida);
      this.codigosUsados = this.ampliIntCode.codigosCopia;
      //console.log("codigosUsados -> %o", this.codigosUsados);

      ampliActual++;

      contadorTotal++;

      //if (ampliActual > 4) {
      //senalEntrada = senalSalida;
      //ampliActual = 0;
      //}

      //ampliActual++;
    }

    senalEntrada = senalSalida;

    // guardara la salida que en esta linea sera la del ultimo ampli,
    // Es decir, la que va hacia los propulsores
    this.senalesHaciaPropulsores.push(senalSalida);
    // });

    // Respuesta Ej 1
    this.potenciaMaximaPropulsores = Math.max(...this.senalesHaciaPropulsores);

    console.log("Respuesta Ej 2 -> %o", this.potenciaMaximaPropulsores);
  };

  /**
   * Devuelve un array con todos los arrays diferentes posibles en los que sus valores se intercambian (permutan) sin repetirse
   */
  public permutador = arrayEntrada => {
    let resultado = [];

    const permutar = (arr, m = []) => {
      if (arr.length === 0) {
        resultado.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          let actual = arr.slice();
          let siguiente = actual.splice(i, 1);
          permutar(actual.slice(), m.concat(siguiente));
        }
      }
    };

    permutar(arrayEntrada);

    return resultado;
  };
}

let prueba = new Dia7();
