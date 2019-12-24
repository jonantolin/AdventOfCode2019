// Dia 9

/*
    Hay que usar el analizador IntCode (del dia 5) e implementar nuevas funcionalidades.
    Ahora a los modos de parametro (0 o vacio)-posicion y (1)-valor se suma otro:
    (2): relativo 

    funciona igual que el modo posicion, pero la posicion no cuenta desde el inicio del array de codigos,
    hay que sumarle una BASE RELATIVA. 
    
    Por ejemplo 4: 

    en modo posicion es -> array[4]
    en modo valor es -> 4
    en modo relativo es -> array[baseRelativa + 4]

    La baseRelativa al principio es 0.

    Cambia por un nuevo codigo de operacion, el 9.

    Este codigo, suma (o resta si es negativo) a la base relativa el valor de su unico parametro

    Ejercicio 1: 

    El programa pedira una instruccion de entrada que en es 1.
    Si es correcto emitira un unico codigo, que es la respuesta al ejercicio.

*/
import { codigosEntrada, codigosPrueba1 } from "./codigosEntrada";
import { AnalizadorIntCode } from "../IntCodeApp/analizadorIntCode";

class Dia9 {
  public entradaEj1: number = 1;
  public entradaEj2: number = 2;

  constructor() {
    let ejercicio1 = new AnalizadorIntCode(this.entradaEj1, codigosEntrada);
    let ejercicio2 = new AnalizadorIntCode(this.entradaEj2, codigosEntrada);
  }
}

let prueba = new Dia9();
