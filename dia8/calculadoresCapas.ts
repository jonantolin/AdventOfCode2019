import { codDigitos } from "./codigoDigitos";

export class CalculadoresCapas {
  [x: string]: any;

  public copiaCodDigitos = codDigitos.slice(0);

  public arrayCapas: any[] = [];
  public contadoresCerosCapas: number[] = [];

  public arrayFilas: Array<number>[] = [];

  public tamanoFilas: number = 25;
  public numFilas: number = 6;

  // array de 6 filas de 25 elementos cada una
  public imagenDescodificada: Array<number>[] = [];
  constructor() {}

  public agruparEnFilas = () => {
    let fila: number[] = [];
    let arrayFilas: Array<number>[] = [];

    //let contadoresCerosCapas: number[] = [];

    this.copiaCodDigitos.map(digito => {
      fila.push(digito);

      if (fila.length === this.tamanoFilas) {
        arrayFilas.push(fila);
        fila = [];
      }
    });

    return arrayFilas;
  };

  public agruparEnCapas = arrayFilas => {
    let capa: Array<number>[] = [];
    let arrayCapas: any[] = [];
    let cerosFilas = 0;

    arrayFilas.map(fila => {
      let cerosPorFila = fila.filter(num => num === 0);
      cerosFilas += cerosPorFila.length;
      capa.push(fila);

      if (capa.length === this.numFilas) {
        arrayCapas.push(capa);

        this.contadoresCerosCapas.push(cerosFilas);
        capa = [];
        cerosFilas = 0;
      }
    });

    return arrayCapas;
  };

  public responderEj1 = () => {
    let numMenorCerosCapas = Math.min(...this.contadoresCerosCapas);

    let capaConMenosCeros = this.arrayCapas[
      this.contadoresCerosCapas.indexOf(numMenorCerosCapas)
    ];

    let numeroUnos = 0;
    let numeroDoses = 0;
    capaConMenosCeros.map(fila => {
      fila.map(num => {
        if (num === 1) {
          numeroUnos++;
        } else if (num === 2) {
          numeroDoses++;
        }
      });
    });

    console.log("Respuesta Ej1 -> %o", numeroUnos * numeroDoses);
  };

  public descodificarImagen = () => {
    let filaImagen: number[] = [];
    let capaImagen: Array<number>[] = [];

    // recorro la primera capa y voy comparando dentro con las otras
    this.arrayCapas[0].map((fila, indiceFila, arrCapa0) => {
      fila.map((digito, indiceDigito, arrFila0) => {
        if (digito === 1 || digito === 0) {
          filaImagen.push(digito);
        }
        // el digito es 2 - transparente
        else {
          for (
            let contComparador = 1;
            contComparador < this.arrayCapas.length;
            contComparador++
          ) {
            let digito = this.arrayCapas[contComparador][indiceFila][
              indiceDigito
            ];

            // digito opaco encontrado
            if (digito === 1 || digito === 0) {
              filaImagen.push(digito);
              break;
            }
          }
        }
      });

      capaImagen.push(filaImagen);
      filaImagen = [];
    });

    console.log("Respuesta Ej2 --------------------");
    //console.log(capaImagen);

    let imagenSinComas: string[] = [];

    let filaSinComas: string = "";

    capaImagen.map(fila => {
      fila.map(digito => {
        if (digito === 1) {
          filaSinComas += digito.toString();
        } else {
          filaSinComas += " ";
        }
      });
      imagenSinComas.push(filaSinComas);
      filaSinComas = "";
    });

    console.log(imagenSinComas);
  };
}
