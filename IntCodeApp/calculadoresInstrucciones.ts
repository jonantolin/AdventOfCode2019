export class CalculadoresInstrucciones {
  [x: string]: any;

  public instruccion1 = (
    param1: number,
    param2: number,
    escrituraParam: number,
    modoEscritura: number
  ) => {
    if (modoEscritura === 2) {
      escrituraParam = escrituraParam + this.baseRelativa;
    }
    this.codigosCopia[escrituraParam] = param1 + param2;
  };

  public instruccion2 = (
    param1: number,
    param2: number,
    escrituraParam: number,
    modoEscritura: number
  ) => {
    if (modoEscritura === 2) {
      escrituraParam = escrituraParam + this.baseRelativa;
    }
    this.codigosCopia[escrituraParam] = param1 * param2;
  };

  public instruccion3 = (
    entradaElegida: number,
    param1: number,
    modo: number
  ) => {
    if (modo === 2) {
      param1 = param1 + this.baseRelativa;
    }
    this.codigosCopia[param1] = entradaElegida;
  };

  public instruccion4 = (param1: number) => {
    //console.log("salida -> %o", this.codigosCopia[param1]);
    return param1;
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

  public instruccion7 = (
    param1: number,
    param2: number,
    escrituraParam: number,
    modoEscritura: number
  ) => {
    if (modoEscritura === 2) {
      escrituraParam = escrituraParam + this.baseRelativa;
    }
    if (param1 < param2) {
      this.codigosCopia[escrituraParam] = 1;
    } else {
      this.codigosCopia[escrituraParam] = 0;
    }
  };

  public instruccion8 = (
    param1: number,
    param2: number,
    escrituraParam: number,
    modoEscritura: number
  ) => {
    if (modoEscritura === 2) {
      escrituraParam = escrituraParam + this.baseRelativa;
    }
    if (param1 == param2) {
      this.codigosCopia[escrituraParam] = 1;
    } else {
      this.codigosCopia[escrituraParam] = 0;
    }
  };

  public instruccion9 = (param1: number) => {
    this.baseRelativa += param1;
  };
}
