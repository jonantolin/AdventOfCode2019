import {codigosEntrada,codigosPrueba1} from "./codigosEntrada";
import { AnalizadorIntCode } from "./analizadorIntCodes";

class Dia9{

    public entradaEj1 = 1;
    public entradaEj2 = 2;

    constructor(){

        let ejercicio1 = new AnalizadorIntCode(this.entradaEj1, codigosEntrada);
        let ejercicio2 = new AnalizadorIntCode(this.entradaEj2, codigosEntrada);
    }
}

let prueba1 = new Dia9();