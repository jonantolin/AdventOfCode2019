export class CalculadoresInstrucciones {
  [x: string]: any;

  public instruccion1 = (param1: number, param2: number, salida: number) => {
    this.codigosCopia[salida] = param1 + param2;
  };

  public instruccion2 = (param1: number, param2: number, salida: number) => {
    this.codigosCopia[salida] = param1 * param2;
  };

  public instruccion3 = (entradaElegida: number, param1: number) => {
    this.codigosCopia[param1] = entradaElegida;
  };

  public instruccion4 = (param1: number) => {
    //console.log("salida -> %o", this.codigosCopia[param1]);
    return this.codigosCopia[param1];
  };

  // nuevas instrucciones Ej 2

  public instruccion5 = (
    param1: number,
    param2: number,
    contador: number
  ): number => {
    contador += 3;
    if (param1 != 0) {
      contador = param2;
    }
    return contador;
  };

  public instruccion6 = (
    param1: number,
    param2: number,
    contador: number
  ): number => {
    contador += 3;
    if (param1 == 0) {
      contador = param2;
    }
    return contador;
  };

  public instruccion7 = (param1: number, param2: number, salida: number) => {
    if (param1 < param2) {
      this.codigosCopia[salida] = 1;
    } else {
      this.codigosCopia[salida] = 0;
    }
  };

  public instruccion8 = (param1: number, param2: number, salida: number) => {
    if (param1 == param2) {
      this.codigosCopia[salida] = 1;
    } else {
      this.codigosCopia[salida] = 0;
    }
  };
}
