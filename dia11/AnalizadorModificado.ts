import { CalculadoresInstrucciones } from "../IntCodeApp/calculadoresInstrucciones";

/**
 * AnalizadorIntCode para el funcionamiento del robot Dia 11
 */
export class AnalizadorModificado extends CalculadoresInstrucciones {
  public codigosCopia: number[];
  public entradaElegida: number;
  public baseRelativa: number = 0;

  public salidaDato: number;

  //variables robot
  public posicionInicio = { x: 0, y: 0 };
  public posicionActual = this.posicionInicio;

  // 0 / 360, 90, 180, 270
  public gradosActual: number = 0;

  // color (0 - negro, 1 - blanco)
  public bloquesPintados: { x: number; y: number; color: number }[] = [];

  // Solo se guardarán al pasar la primera vez (RESPUESTA EJ1)
  public bloquesRecorridos: { x: number; y: number }[] = [];

  constructor(entradaInicial: number, codsEntrada: number[]) {
    super();
    this.codigosCopia = codsEntrada.slice(0);
    this.entradaElegida = entradaInicial;
    this.analizarIntCode();

    // num de bloques en los que ha pintado al menos 1 vez
    if (entradaInicial === 0) {
      // Ej 1
      console.log("Respuesta EJ1 -> %o", this.bloquesRecorridos.length);
    } else {
      // Ej 2
      this.pintarTableroEj2();
    }
  }

  public analizarIntCode = () => {
    let contador: number = 0;

    // para el robot, la primera salida, indica color a pintar donde este 0 - negro, 1 - blanco
    // la segunda indica direccion a mover, 0 - 90 grados izq, 1 - 90 grados drch
    let contadorSalidas: number = 0;

    // color a pintar cada vez
    let colorPintar: number;

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
          //console.log("entrada -> %o", this.entradaElegida);
          contador += 2;
          break;
        case "4":
          this.salidaDato = this.instruccion4(param1ConModo);

          contadorSalidas++;

          // la primer salida indica color que pinta donde esta
          if (contadorSalidas == 1) {
            colorPintar = this.salidaDato;
            this.bloquesPintados.push({
              x: this.posicionActual.x,
              y: this.posicionActual.y,
              color: colorPintar
            });

            let repetido = this.bloquesRecorridos.find(bloque => {
              return (
                bloque.x === this.posicionActual.x &&
                bloque.y === this.posicionActual.y
              );
            });
            if (repetido == undefined) {
              this.bloquesRecorridos.push({
                x: this.posicionActual.x,
                y: this.posicionActual.y
              });
            }
          } else {
            // La segunda salida indica hacia donde girar y moverse el robot
            // guardará para la siguiente instruccion de entrada el color del bloque donde termine

            // direccion robot
            if (this.salidaDato == 0) {
              this.gradosActual -= 90;
              if (this.gradosActual == -90) {
                this.gradosActual = 270;
              }
            } else if (this.salidaDato == 1) {
              this.gradosActual += 90;
              if (this.gradosActual == 450) {
                this.gradosActual = 90;
              }
            }

            //moverse

            switch (this.gradosActual) {
              case 0:
                this.posicionActual.y++;
                break;
              case 360:
                this.posicionActual.y++;
                break;
              case 90:
                this.posicionActual.x++;
                break;
              case 180:
                this.posicionActual.y--;
                break;
              case 270:
                this.posicionActual.x--;
                break;
            }

            // buscar el color del bloque de la posicion a la que se ha movido que sera la siguiente instruccion de entrada
            // es el color de la ultima vez que pinto en el punto en el que está (si es que pasó por él)

            let bloqueActual = this.bloquesPintados.reverse().find(bloque => {
              return (
                this.posicionActual.x === bloque.x &&
                this.posicionActual.y === bloque.y
              );
            });

            // La instruccion anterior muta el array original, por lo que le vuelvo a dar la vuelta
            this.bloquesPintados.reverse();

            let colorBloqueActual = 0;
            if (bloqueActual != undefined) {
              colorBloqueActual = bloqueActual.color;
            }

            this.entradaElegida = colorBloqueActual;
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

  /**
   * Pinta en cada fila del tablero un espacio vacío " " donde no haya un bloque blanco
   * y # donde sí lo haya.
   * Después imprime la fila.
   * Al terminar las # forman 8 letras mayúsculas.
   */
  public pintarTableroEj2 = () => {
    // el color final de los bloques aunque hayan sido pintados N veces
    let bloquesUltimoColor: { x: number; y: number; color: number }[] = [];

    let bloquesPintadosCopia = this.bloquesPintados.slice(0);
    bloquesPintadosCopia.reverse();

    bloquesPintadosCopia.map((bloqueP, indice, arr) => {
      let existe = bloquesUltimoColor.find(bloqueU => {
        return bloqueU.x === bloqueP.x && bloqueU.y === bloqueP.y;
      });

      if (existe == undefined) {
        bloquesUltimoColor.push(bloqueP);
      }
    });

    let bloquesBlancos: { x: number; y: number; color: number }[] = [];

    bloquesBlancos = bloquesUltimoColor.filter(bloque => {
      return bloque.color === 1;
    });

    let coorsX = bloquesBlancos.map(bloque => bloque.x);
    let maxX = Math.max(...coorsX);
    let minX = Math.min(...coorsX);

    //console.log("max -> %o , min -> %o", maxX, minX);

    let coorsY = bloquesBlancos.map(bloque => bloque.y);
    let maxY = Math.max(...coorsY);
    let minY = Math.min(...coorsY);

    //console.log("max -> %o , min -> %o", maxY, minY);

    // x -> 1 -> 39 // fila
    // y -> -5 -> 0 // numFilas

    let fila: string = "";

    let contNumFilas = 0;
    let contFila = 0;

    console.log("Respuesta Ej2");
    console.log("-------------");

    while (contNumFilas >= minY) {
      while (contFila <= maxX) {
        let pintado = bloquesBlancos.find(bloque => {
          return bloque.x === contFila && bloque.y === contNumFilas;
        });

        if (pintado == undefined) {
          fila += " ";
        } else {
          fila += "#";
        }

        contFila++;
      }

      console.log(fila);

      fila = "";

      contFila = 0;
      contNumFilas--;
    }
  };
}
