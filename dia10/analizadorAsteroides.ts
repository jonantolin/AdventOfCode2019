import {
  mapaAsteroides,
  mapaPruebaAsteroides1,
  mapaPruebaAsteroides2
} from "./mapaAsteroides";

export class AnalizadorAsteroides {
  public mapaEnBruto: string[] = [];
  public coordenadasAst: { x: number; y: number }[] = [];
  public asteroidesConVisibles: {
    x: number;
    y: number;
    visibles: number;
  }[] = [];
  public cantidadesAsteroidesVisibles: number[] = [];
  public mayorCantVisibles: number = 0;

  // Ejercicio 2

  public asteroides12a3: { x: number; y: number; pendiente: number }[] = [];
  public asteroides3a6: { x: number; y: number; pendiente: number }[] = [];
  public asteroides6a9: { x: number; y: number; pendiente: number }[] = [];
  public asteroides9a12: { x: number; y: number; pendiente: number }[] = [];

  public asteroidesDestruidos: {
    x: number;
    y: number;
    pendiente: number;
  }[] = [];

  constructor() {
    //copia mapa dado
    this.mapaEnBruto = mapaAsteroides.slice(0);
    this.coordenadasAst = this.obtenerCoordenadasAst(this.mapaEnBruto);

    // Ej 1
    this.calcularAsteroidesVisibles();

    // Ej 2
    this.prepararLaser();
    this.dispararLaser();
  }

  /**
   * Devuelve un array con los asteroides detectados y sus coordenadas
   */
  public obtenerCoordenadasAst = (mapaEnBruto): { x: number; y: number }[] => {
    let coordenadasAst = [];

    mapaEnBruto.map((fila, indiceFila, arrFila) => {
      fila = fila.split("");
      fila.map((caracter, indiceCaracter, arrCaracter) => {
        if (caracter == "#") {
          coordenadasAst.push({ x: indiceCaracter, y: indiceFila });
        }
      });
    });

    return coordenadasAst;
  };

  /**
   * Calcula y guarda el número de asteroides visibles para cada asteroide.
   * Imprime por consola el número de asteroides del que más cantidad de ellos puede ver.
   */
  public calcularAsteroidesVisibles = () => {
    // pendiente = y2 - y1 / x2 - x1

    //let puntoPrueba = { x: 5, y: 8 };
    //let puntoPrueba = { x: 1, y: 2 };

    this.coordenadasAst.map(astOrigen => {
      let pendientesTodasEncima = [];
      let arribaAbajoEncontrado = false;
      let cont = 0;

      while (!arribaAbajoEncontrado) {
        if (
          this.coordenadasAst[cont].x == astOrigen.x &&
          this.coordenadasAst[cont].y == astOrigen.y
        ) {
          arribaAbajoEncontrado = true;
          break;
        }

        let pendiente =
          (this.coordenadasAst[cont].y - astOrigen.y) /
          (this.coordenadasAst[cont].x - astOrigen.x);

        pendientesTodasEncima.push(pendiente);
        cont++;
      }

      let pendientesDistintasEncima = new Set(pendientesTodasEncima);

      // Ahora las que estuvieran debajo, empezando desde el último asteroide del mapa

      let pendientesTodasDebajo = [];
      let abajoArribaEncontrado = false;
      cont = this.coordenadasAst.length - 1;

      while (!abajoArribaEncontrado) {
        if (
          this.coordenadasAst[cont].x == astOrigen.x &&
          this.coordenadasAst[cont].y == astOrigen.y
        ) {
          abajoArribaEncontrado = true;
          break;
        }

        let pendiente =
          (this.coordenadasAst[cont].y - astOrigen.y) /
          (this.coordenadasAst[cont].x - astOrigen.x);

        pendientesTodasDebajo.push(pendiente);
        cont--;
      }

      let pendientesDistintasDebajo = new Set(pendientesTodasDebajo);

      // sumo las distintas pendientes por encima y las distintas pendientes por debajo
      let asteroidesVisibles =
        pendientesDistintasEncima.size + pendientesDistintasDebajo.size;

      // guardo cada asteroide con la cantidad de asteroides que ve
      this.asteroidesConVisibles.push({
        x: astOrigen.x,
        y: astOrigen.y,
        visibles: asteroidesVisibles
      });

      this.cantidadesAsteroidesVisibles = this.asteroidesConVisibles.map(
        asteroide => {
          return asteroide.visibles;
        }
      );

      // Respuesta Ej1
      this.mayorCantVisibles = Math.max(...this.cantidadesAsteroidesVisibles);
    });

    // Respuesta Ej1
    console.log("Respuesta Ej 1 -> %o", this.mayorCantVisibles);
  };

  public prepararLaser = () => {
    // asteroide donde se coloca laser
    let asteroideOrigen = this.asteroidesConVisibles.find(ast => {
      return ast.visibles === this.mayorCantVisibles;
    });

    console.log("Asteroide con mas visibles -> %o", asteroideOrigen);

    this.agruparAstCuadrantePendiente(asteroideOrigen);
    this.ordenarPorPendiente();
  };

  /**
   * Agrupa los asteroides en un array distinto por cuadrante segun su posicion respecto al asteroide origen / laser
   */
  public agruparAstCuadrantePendiente = (asteroideOrigen: {
    x: number;
    y: number;
    visibles: number;
  }) => {
    // los asteroides entre 9-12 tienen aqui pendientes positivas
    // los asteroides entre 12-3 tienen aqui pendientes negativas
    // -infinity son los que estan justo encima (POR LOS QUE EMPIEZA EL LASER)

    let astOrigen = asteroideOrigen;

    let arribaAbajoEncontrado = false;
    let cont = 0;

    while (!arribaAbajoEncontrado) {
      if (
        this.coordenadasAst[cont].x == astOrigen.x &&
        this.coordenadasAst[cont].y == astOrigen.y
      ) {
        arribaAbajoEncontrado = true;
        break;
      }

      let pendiente =
        (this.coordenadasAst[cont].y - astOrigen.y) /
        (this.coordenadasAst[cont].x - astOrigen.x);

      if (pendiente < 0) {
        this.asteroides12a3.push({
          x: this.coordenadasAst[cont].x,
          y: this.coordenadasAst[cont].y,
          pendiente: pendiente
        });
      } else {
        this.asteroides9a12.push({
          x: this.coordenadasAst[cont].x,
          y: this.coordenadasAst[cont].y,
          pendiente: pendiente
        });
      }

      cont++;
    }

    // Aqui las pendientes positivas estan en el cuadrante de 3 a 6
    // 0 si esta justo a la derecha (en la manecilla del 3), lo meto en de 3 a 6
    // Aqui las pendientes negativas estan en el cuadrante de 6 a 9

    let abajoArribaEncontrado = false;
    cont = this.coordenadasAst.length - 1;

    while (!abajoArribaEncontrado) {
      if (
        this.coordenadasAst[cont].x == astOrigen.x &&
        this.coordenadasAst[cont].y == astOrigen.y
      ) {
        abajoArribaEncontrado = true;
        break;
      }

      let pendiente =
        (this.coordenadasAst[cont].y - astOrigen.y) /
        (this.coordenadasAst[cont].x - astOrigen.x);

      if (pendiente < 0) {
        this.asteroides6a9.push({
          x: this.coordenadasAst[cont].x,
          y: this.coordenadasAst[cont].y,
          pendiente: pendiente
        });
      } else {
        this.asteroides3a6.push({
          x: this.coordenadasAst[cont].x,
          y: this.coordenadasAst[cont].y,
          pendiente: pendiente
        });
      }

      cont--;
    }
  };

  /**
   * Ordena los asteroides de cada cuadrante por pendiente en sentido de las agujas del reloj,
   * y en aquellos con pendiente igual, por coordenadas más cercanas al laser
   */
  public ordenarPorPendiente = () => {
    //PRUEBA

    // ordeno por pendiente de menor a mayor de 12 a 3,
    // si son iguales mayor a menor coor y (el punto (0,0) es la esquina de arriba! no el laser ),
    // si tb son iguales, menor a mayor coor x
    this.asteroides12a3.sort((a, b) => {
      if (a.pendiente !== b.pendiente) {
        return a.pendiente - b.pendiente;
      } else {
        if (a.y !== b.y) {
          return b.y - a.y;
        } else {
          return a.x - b.x;
        }
      }
    });

    // asteroides 3 a 6

    this.asteroides3a6.sort((a, b) => {
      if (a.pendiente !== b.pendiente) {
        return a.pendiente - b.pendiente;
      } else {
        if (a.y !== b.y) {
          return a.y - b.y;
        } else {
          return a.x - b.x;
        }
      }
    });

    //asteroides 6 a 9

    this.asteroides6a9.sort((a, b) => {
      if (a.pendiente !== b.pendiente) {
        return a.pendiente - b.pendiente;
      } else {
        if (a.y !== b.y) {
          return a.y - b.y;
        } else {
          return a.x - b.x;
        }
      }
    });

    //asteroides 9 a 12

    this.asteroides9a12.sort((a, b) => {
      if (a.pendiente !== b.pendiente) {
        return a.pendiente - b.pendiente;
      } else {
        if (a.y !== b.y) {
          return b.y - a.y;
        } else {
          return b.x - a.x;
        }
      }
    });
  };

  /**
   * El láser 'gira' en sentido horario eliminando un asteroide por pendiente en cada array
   * hasta recorrer los 4 cuadrantes y vuelve a girar hasta que todos los arrays queden vacios
   */
  public dispararLaser = () => {
    // empieza en el array 12a3, luego 3a6, luego 6a9, luego 9a12

    while (
      this.asteroides12a3.length > 0 ||
      this.asteroides3a6.length > 0 ||
      this.asteroides6a9.length > 0 ||
      this.asteroides9a12.length > 0
    ) {
      ////
      this.arrasar90grados(this.asteroides12a3);
      this.arrasar90grados(this.asteroides3a6);
      this.arrasar90grados(this.asteroides6a9);
      this.arrasar90grados(this.asteroides9a12);
    }

    console.log(
      "Asteroide destruido num 200 -> %o",
      this.asteroidesDestruidos[199]
    );
    console.log(
      "Respuesta Ej2 -> %o",
      this.asteroidesDestruidos[199].x * 100 + this.asteroidesDestruidos[199].y
    );
  };

  public arrasar90grados = (
    arrayCuadrante: { x: number; y: number; pendiente: number }[]
  ): { x: number; y: number; pendiente: number }[] => {
    let indicesBorrar = [];

    let pendientesDistintas = new Set(arrayCuadrante);

    if (pendientesDistintas.size > 1) {
      arrayCuadrante.map((ast, indice, arr) => {
        if (ast.pendiente != arr[indice - 1]?.pendiente) {
          indicesBorrar.push(indice);
        }
      });

      let contBorrador = 0;
      indicesBorrar.map(indic => {
        this.asteroidesDestruidos.push(arrayCuadrante[indic + contBorrador]);
        arrayCuadrante.splice(indic + contBorrador, 1);
        contBorrador--;
      });
    } else {
      if (arrayCuadrante[0] != undefined) {
        this.asteroidesDestruidos.push(arrayCuadrante[0]);
        arrayCuadrante.splice(0, 1);
      }
    }

    return arrayCuadrante;
  };
}
