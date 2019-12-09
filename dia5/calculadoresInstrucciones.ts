// TODO completar e importar a principal

export function segunModo(modo, valor) {
  if (modo == 0) {
    return this.codigosCopia[valor];
  } else if (modo == 1) {
    return valor;
  }
}

export function instruccion1(param1, param2, salida) {
  this.codigosCopia[salida] = param1 + param2;
}

export function instruccion2(param1, param2, salida) {
  this.codigosCopia[salida] = param1 * param2;
}

export function instruccion3(entradaElegida, param1) {
  this.codigosCopia[param1] = entradaElegida;
}

export function instruccion4(param1) {
  console.log(this.codigosCopia[param1]);
}
