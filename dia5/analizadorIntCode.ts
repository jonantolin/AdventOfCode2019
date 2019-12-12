//
import { CalculadoresInstrucciones } from "./calculadoresInstrucciones";

export class AnalizadorIntCode extends CalculadoresInstrucciones {
  // copia de los codigos proporcionados
  //public codigosCopia: number[] = codigosEntrada.slice(0);
  //public codigosCopia: number[] = codigosPrueba.slice(0);

  // Ej1
  //public ENTRADA_INICIAL: number = 5;
  //public entradaElegida = this.ENTRADA_INICIAL;
  //public codigosEntrada: number[];

  public codigosCopia: number[];
  public entradaElegida: number;

  public salida: number;

  constructor(entradaInicial: number, codsEntrada) {
    super();
    this.codigosCopia = codsEntrada.slice(0);
    this.entradaElegida = entradaInicial;
    this.analizarIntCode();
  }

  public analizarIntCode = () => {
    let contador: number = 0;

    while (
      contador < this.codigosCopia.length &&
      this.codigosCopia[contador] != undefined
    ) {
      let instruccion: string = Math.abs(
        this.codigosCopia[contador]
      ).toString();

      // 01 ó 02 ó 03 ó 04 ...
      let codInstruccion: string = instruccion.slice(-1);

      let param1: number = this.codigosCopia[contador + 1];
      let param2: number = this.codigosCopia[contador + 2];
      let salida: number = this.codigosCopia[contador + 3];

      let modo1: number = 0;
      let modo2: number = 0;

      modo1 = +instruccion.toString().slice(-3, -2);
      modo2 = +instruccion.toString().slice(-4, -3);

      let param1ConModo: number = this.segunModo(modo1, param1);
      let param2ConModo: number = this.segunModo(modo2, param2);

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
          this.salida = this.instruccion4(param1);
          console.log("salida -> %o", this.salida);
          contador += 2;
          break;
        case "5":
          contador = this.instruccion5(param1ConModo, param2ConModo, contador);
          break;
        case "6":
          contador = this.instruccion6(param1ConModo, param2ConModo, contador);
          break;
        case "7":
          this.instruccion7(param1ConModo, param2ConModo, salida);
          contador += 4;
          break;
        case "8":
          this.instruccion8(param1ConModo, param2ConModo, salida);
          contador += 4;
          break;
        default:
          console.log("Error: operación incorrecta");
          contador += 9999;
          break;
      }
    }
  };

  public segunModo = (modo: number, valor: number): number => {
    if (modo == 0) {
      return this.codigosCopia[valor];
    } else if (modo == 1) {
      return valor;
    }
  };
}
