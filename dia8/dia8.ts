import {codDigitos} from "./codigoDigitos";

class Dia8{

    public copiaCodDigitos = codDigitos.slice(0);

    public arrayCapas: any[] = [];
    public contadoresCerosCapas: number[] = [];

    public arrayFilas: Array<number>[] = [];
    

    public tamanoFilas: number = 25;
    public numFilas: number = 6;

    constructor(){

        this.arrayFilas = this.agruparEnFilas();
        this.arrayCapas = this.agruparEnCapas(this.arrayFilas);
        this.responderEj1();        

    }

    public agruparEnFilas = () => {

        let fila: number[] = [];
        let arrayFilas: Array<number>[] = [];

        let contadoresCerosCapas: number[] = [];

        this.copiaCodDigitos.map(digito => {

            fila.push(digito);

            if(fila.length === this.tamanoFilas){
                arrayFilas.push(fila);
                fila = [];
            }

            
        });

        return arrayFilas;


    }

    public agruparEnCapas = (arrayFilas) => {

        let capa: Array<number>[] = [];
        let arrayCapas: any[] = [];
        let cerosFilas = 0;

        arrayFilas.map(fila =>{

            let cerosPorFila = fila.filter( num => num === 0);
            cerosFilas += cerosPorFila.length;
            capa.push(fila);

            if(capa.length === this.numFilas){
                arrayCapas.push(capa);

                this.contadoresCerosCapas.push(cerosFilas);
                capa = [];
                cerosFilas = 0;
            }
        });

        return arrayCapas;
    }

    public responderEj1 = () => {

        let numMenorCerosCapas = Math.min(...this.contadoresCerosCapas);

        let capaConMenosCeros = this.arrayCapas[this.contadoresCerosCapas.indexOf(numMenorCerosCapas)]

        let numeroUnos = 0;
        let numeroDoses = 0;
        capaConMenosCeros.map(fila => {
            fila.map( num => {
                if(num === 1){
                    numeroUnos++;
                }else if(num === 2){
                    numeroDoses++;
                }
            });
        });

        console.log("Respuesta Ej1 -> %o", numeroUnos * numeroDoses);


    }




}

let prueba = new Dia8();