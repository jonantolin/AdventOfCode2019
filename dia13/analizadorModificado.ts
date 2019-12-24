import { CalculadoresInstrucciones } from "../IntCodeApp/calculadoresInstrucciones";

/**
 * Analizador Int Code modificado para el Dia 13
 */
export class AnalizadorModificado extends CalculadoresInstrucciones {
  public codigosCopia: number[];
  public entradaElegida: number;
  public baseRelativa: number = 0;

  public salidaDato: number;

  // Todos los bloques aunque los tipo:0 no lo sean
  public bloquesTablero = [];

  constructor(entradaInicial: number, codsEntrada: number[]) {
    super();
    this.codigosCopia = codsEntrada.slice(0);
    this.entradaElegida = entradaInicial;

    // Ej 2
    // this.entradaElegida[0] = 2;
    this.analizarIntCode();

    // Bloques que pide Ej 1
    let azulejosTipoBloque = this.bloquesTablero.filter(
      bloque => bloque.tipo === 2
    );

    //Respuesta Ej1
    console.log("Respuesta Ej1 -> %o ", azulejosTipoBloque.length);
  }

  public analizarIntCode = () => {
    let contador: number = 0;

    // Las salidas van de 3 en 3, 1 - posX, 2 - posY, 3 - tipoBloque
    let contadorSalidas: number = 0;

    // salidas devueltas para cada azulejo
    let posX: number;
    let posY: number;
    let tipo: number;

    while (
      contador < this.codigosCopia.length &&
      this.codigosCopia[contador] != undefined
    ) {
      let instruccion: string = this.codigosCopia[contador].toString();

      // 01 ó 02 ó 03 ó 04 ...
      let codInstruccion: string = instruccion.slice(-1);

      let param1: number = this.codigosCopia[contador + 1];
      let param2: number = this.codigosCopia[contador + 2];
      let escrituraParam: number = this.codigosCopia[contador + 3];

      let modo1: number = 0;
      let modo2: number = 0;
      let modoEscritura: number = 0;

      modo1 = +instruccion.toString().slice(-3, -2);
      modo2 = +instruccion.toString().slice(-4, -3);
      modoEscritura = +instruccion.toString().slice(-5, -4);

      let param1ConModo: number = this.segunModo(modo1, param1);
      let param2ConModo: number = this.segunModo(modo2, param2);

      if (instruccion.slice(-2) == "99") {
        console.log("programa detenido");
        break;
      }

      switch (codInstruccion) {
        case "1":
          this.instruccion1(
            param1ConModo,
            param2ConModo,
            escrituraParam,
            modoEscritura
          );
          contador += 4;
          break;
        case "2":
          this.instruccion2(
            param1ConModo,
            param2ConModo,
            escrituraParam,
            modoEscritura
          );
          contador += 4;
          break;
        case "3":
          this.instruccion3(this.entradaElegida, param1, modo1);
          contador += 2;
          break;
        case "4":
          this.salidaDato = this.instruccion4(param1ConModo);
          //console.log("salida -> %o", this.salidaDato);

          contadorSalidas++;

          if (contadorSalidas === 1) {
            posX = this.salidaDato;
          } else if (contadorSalidas === 2) {
            posY = this.salidaDato;
          } else if (contadorSalidas === 3) {
            tipo = this.salidaDato;

            this.bloquesTablero.push({ x: posX, y: posY, tipo: tipo });
            contadorSalidas = 0;
          }
          contador += 2;
          break;
        case "5":
          contador = this.instruccion5(param1ConModo, param2ConModo, contador);
          break;
        case "6":
          contador = this.instruccion6(param1ConModo, param2ConModo, contador);
          break;
        case "7":
          this.instruccion7(
            param1ConModo,
            param2ConModo,
            escrituraParam,
            modoEscritura
          );
          contador += 4;
          break;
        case "8":
          this.instruccion8(
            param1ConModo,
            param2ConModo,
            escrituraParam,
            modoEscritura
          );
          contador += 4;
          break;
        case "9":
          this.instruccion9(param1ConModo);
          contador += 2;
          break;
        default:
          console.log("Error: operación incorrecta");
          contador += 9999;
          break;
      }
    }
  };

  public segunModo = (modo: number, valor: number): number => {
    if (modo == 0 || modo == undefined) {
      if (this.codigosCopia[valor] == undefined) {
        this.codigosCopia[valor] = 0;
      }

      return this.codigosCopia[valor];
    } else if (modo == 1) {
      return valor;
    } else if (modo == 2) {
      if (this.codigosCopia[valor + this.baseRelativa] == undefined) {
        this.codigosCopia[valor + this.baseRelativa] = 0;
      }
      return this.codigosCopia[valor + this.baseRelativa];
    } else {
      return this.codigosCopia[valor];
    }
  };
}
