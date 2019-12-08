
import {movCable1, movCable2} from './movimientosCables';
import {calcularSegmentosCable, calcularIntersecciones, calcularDistancias} from './segmentos';
import {calcularPasosOptimos} from './calculadoresPasos';

class CablesCruzados {

    public segmentosCable1: {x1:number, y1:number, x2: number, y2:number}[] = [];
    public segmentosCable2: {x1:number, y1:number, x2: number, y2:number}[] = [];
    public intersecciones: Array<number>[] = []; 
    public distancias: number[] = [];

    // Ejercicio1
    public distanciaMasCorta: number;


    // Ejercicio2
    public numPasosIntersecciones: number[];
    public menorNumPasos: number;

    constructor(){

        // Ejercicio1
        this.segmentosCable1 = calcularSegmentosCable(movCable1);
        this.segmentosCable2 = calcularSegmentosCable(movCable2);
        this.intersecciones = calcularIntersecciones(this.segmentosCable1, this.segmentosCable2);
        this.distancias = calcularDistancias(this.intersecciones);
        this.distanciaMasCorta = this.distancias[0];
        console.log("Respuesta Ej1 -> %o", this.distanciaMasCorta);

        // Ejercicio2 
        this.numPasosIntersecciones = calcularPasosOptimos(this.intersecciones, movCable1, movCable2);
        this.menorNumPasos = this.numPasosIntersecciones[0];
        console.log("Respuesta Ej2 -> %o", this.menorNumPasos);

    }


}

let prueba = new CablesCruzados();





