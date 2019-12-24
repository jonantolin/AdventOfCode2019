// Dia 12

/**
 * Las lunas de Jupiter Io , Europa , Ganímedes y Calisto,
 * tienen posicion y velocidad y una gravedad que les afecta
 *
 * Cada luna tiene una posicion en 3d (x, y, z) y velocidad (x, y, z)
 *
 * La velocidad inicial de cada luna es (0, 0, 0)
 *
 * Se van modificando las posiciones en PASOS DE TIEMPO.
 *
 * En 1 PASO DE TIEMPO, se actualiza la posición así:
 *
 * - Se aplica GRAVEDAD -> les genera una velocidad :
 * Cada par de lunas se toma sus posiciones,
 * por ejemplo si Gaminedes tiene 3 en la posicion X y Calisto 5 en la posicon X
 * la velocidad X de Gaminedes sera, su velocidad + 1 (porque 5 > 3) (SI, ESTA AL REVES)
 * y la velocidad de Calisto sera, su velocidad - 1 (porque 3 < 5).
 * Si son iguales no cambia.
 *
 * - Se aplica VELOCIDAD:
 * A las posiciones se les aplica la propia velocidad obtenida del paso anterior.
 * Simplemente se suma la X de la posicion yn la X de la velocidad,
 * la Y con la Y y Z con Z
 *
 * Ahora hay que calcular la energía de cada luna que es la multiplicacion de la energia potencial
 * por la energia cinética
 *
 * - La energia potencial es: pot = |posicionX| + |posicionY| + |posicionZ|
 * - La energia cinetica: cin = |velocidadX| + |velocidadY| + |velocidadZ|
 * - energia total de la luna: totalLuna = pot * cin
 *
 * La energia total del sistema en 1 PASO DE TIEMPO ES:
 *
 * totalSistema = totalLuna1 + totalLuna2 + totalLuna3 + totalLuna4
 *
 * // Ejercicio 1
 *
 * Calcular la energia total del sistema en el paso número 1000.
 * 
 * Posiciones dadas: 
 * 
 *  <x=-2, y=9, z=-5>
    <x=16, y=19, z=9>
    <x=0, y=3, z=6>
    <x=11, y=0, z=11>
 *

  // Ejercicio 2: 

  Calcular el paso de tiempo en el que las posiciones de las lunas y sus velocidades, 
  vuelven a ser las de partida
 */
class Dia12 {
  public pasosEjercicio1: number = 1000;
  //TODO

  public posicionesInicio = [
    { nombre: "io", posX: -2, posY: 9, posZ: -5 },
    { nombre: "gaminedes", posX: 16, posY: 19, posZ: 9 },
    { nombre: "calisto", posX: 0, posY: 3, posZ: 6 },
    { nombre: "europa", posX: 11, posY: 0, posZ: 11 }
  ];

  public velocidadesInicio = [
    { nombre: "io", velX: 0, velY: 0, velZ: 0 },
    { nombre: "gaminedes", velX: 0, velY: 0, velZ: 0 },
    { nombre: "calisto", velX: 0, velY: 0, velZ: 0 },
    { nombre: "europa", velX: 0, velY: 0, velZ: 0 }
  ];

  // LA ENERGIA TOTAL EN LA PRUEBA DEBE DAR 179
  public posicionesInicioPrueba = [
    { nombre: "io", posX: -1, posY: 0, posZ: 2 },
    { nombre: "gaminedes", posX: 2, posY: -10, posZ: -7 },
    { nombre: "calisto", posX: 4, posY: -8, posZ: 8 },
    { nombre: "europa", posX: 3, posY: 5, posZ: -1 }
  ];

  public posicionesEnPasoTiempoPrueba = [
    { nombre: "io", posX: -1, posY: 0, posZ: 2 },
    { nombre: "gaminedes", posX: 2, posY: -10, posZ: -7 },
    { nombre: "calisto", posX: 4, posY: -8, posZ: 8 },
    { nombre: "europa", posX: 3, posY: 5, posZ: -1 }
  ];

  public posicionesEnPasoTiempo = [
    { nombre: "io", posX: -2, posY: 9, posZ: -5 },
    { nombre: "gaminedes", posX: 16, posY: 19, posZ: 9 },
    { nombre: "calisto", posX: 0, posY: 3, posZ: 6 },
    { nombre: "europa", posX: 11, posY: 0, posZ: 11 }
  ];

  public velocidadesEnPasoTiempo = [
    { nombre: "io", velX: 0, velY: 0, velZ: 0 },
    { nombre: "gaminedes", velX: 0, velY: 0, velZ: 0 },
    { nombre: "calisto", velX: 0, velY: 0, velZ: 0 },
    { nombre: "europa", velX: 0, velY: 0, velZ: 0 }
  ];

  constructor() {
    // Ejercicio 1
    this.calcularEstadoPasoTiempo(this.pasosEjercicio1);

    // Ejercicio 2 (inviable por fuerza bruta)
    //this.calcularPasosHastaRetorno();
  }

  public calcularPasosHastaRetorno = () => {
    let contadorPasos = 1;

    let vueltaOrigen = false;
    do {
      this.aplicarGravedad();
      this.aplicarVelocidad();
      //comparar si son iguales
      if (
        this.posicionesInicio[0].posX === this.posicionesEnPasoTiempo[0].posX &&
        this.posicionesInicio[0].posY === this.posicionesEnPasoTiempo[0].posY &&
        this.posicionesInicio[0].posZ === this.posicionesEnPasoTiempo[0].posZ &&
        this.posicionesInicio[1].posX === this.posicionesEnPasoTiempo[1].posX &&
        this.posicionesInicio[1].posY === this.posicionesEnPasoTiempo[1].posY &&
        this.posicionesInicio[1].posZ === this.posicionesEnPasoTiempo[1].posZ &&
        this.posicionesInicio[2].posX === this.posicionesEnPasoTiempo[2].posX &&
        this.posicionesInicio[2].posY === this.posicionesEnPasoTiempo[2].posY &&
        this.posicionesInicio[2].posZ === this.posicionesEnPasoTiempo[2].posZ &&
        this.posicionesInicio[3].posX === this.posicionesEnPasoTiempo[3].posX &&
        this.posicionesInicio[3].posY === this.posicionesEnPasoTiempo[3].posY &&
        this.posicionesInicio[3].posZ === this.posicionesEnPasoTiempo[3].posZ &&
        // ---------- velocidades --------------
        this.velocidadesInicio[0].velX ===
          this.velocidadesEnPasoTiempo[0].velX &&
        this.velocidadesInicio[0].velY ===
          this.velocidadesEnPasoTiempo[0].velY &&
        this.velocidadesInicio[0].velZ ===
          this.velocidadesEnPasoTiempo[0].velZ &&
        this.velocidadesInicio[1].velX ===
          this.velocidadesEnPasoTiempo[1].velX &&
        this.velocidadesInicio[1].velY ===
          this.velocidadesEnPasoTiempo[1].velY &&
        this.velocidadesInicio[1].velZ ===
          this.velocidadesEnPasoTiempo[1].velZ &&
        this.velocidadesInicio[2].velX ===
          this.velocidadesEnPasoTiempo[2].velX &&
        this.velocidadesInicio[2].velY ===
          this.velocidadesEnPasoTiempo[2].velY &&
        this.velocidadesInicio[2].velZ ===
          this.velocidadesEnPasoTiempo[2].velZ &&
        this.velocidadesInicio[3].velX ===
          this.velocidadesEnPasoTiempo[3].velX &&
        this.velocidadesInicio[3].velY ===
          this.velocidadesEnPasoTiempo[3].velY &&
        this.velocidadesInicio[3].velZ === this.velocidadesEnPasoTiempo[3].velZ
      ) {
        vueltaOrigen = true;
        console.log("Respuesta Ej2 -> %o", contadorPasos);
        break;
      }

      contadorPasos++;
    } while (!vueltaOrigen);

    console.log(contadorPasos);
  };

  /**
   * Aplica gravedad y velocidad en cada paso de tiempo y calcula la energia total
   * del sistema en el paso final
   */
  public calcularEstadoPasoTiempo = (pasosTiempo: number) => {
    let contPasos = 0;
    let energiaTotalSistema = 0;

    while (contPasos < pasosTiempo) {
      this.aplicarGravedad();
      this.aplicarVelocidad();
      contPasos++;
    }

    // calcular energia potencial y cinetica y total

    this.posicionesEnPasoTiempo.map((lunaPos, indice, arr) => {
      let ePot =
        Math.abs(lunaPos.posX) +
        Math.abs(lunaPos.posY) +
        Math.abs(lunaPos.posZ);
      let eCin =
        Math.abs(this.velocidadesEnPasoTiempo[indice].velX) +
        Math.abs(this.velocidadesEnPasoTiempo[indice].velY) +
        Math.abs(this.velocidadesEnPasoTiempo[indice].velZ);

      let eTotalLuna = ePot * eCin;

      energiaTotalSistema += eTotalLuna;
    });

    console.log("Respuesta Ej1 -> %o", energiaTotalSistema);
  };

  public aplicarGravedad = () => {
    let contador = 0;

    while (contador < this.posicionesInicio.length) {
      let posiciones = this.posicionesEnPasoTiempo;

      let contadorInterno = 1;

      while (contadorInterno < posiciones.length) {
        if (posiciones[0].posX < posiciones[contadorInterno].posX) {
          this.velocidadesEnPasoTiempo[0].velX++;
        } else if (posiciones[0].posX > posiciones[contadorInterno].posX) {
          this.velocidadesEnPasoTiempo[0].velX--;
        }

        if (posiciones[0].posY < posiciones[contadorInterno].posY) {
          this.velocidadesEnPasoTiempo[0].velY++;
        } else if (posiciones[0].posY > posiciones[contadorInterno].posY) {
          this.velocidadesEnPasoTiempo[0].velY--;
        }

        if (posiciones[0].posZ < posiciones[contadorInterno].posZ) {
          this.velocidadesEnPasoTiempo[0].velZ++;
        } else if (posiciones[0].posZ > posiciones[contadorInterno].posZ) {
          this.velocidadesEnPasoTiempo[0].velZ--;
        }

        contadorInterno++;
      }

      let primeraLunaPos = this.posicionesEnPasoTiempo[0];
      let primeraLunaVel = this.velocidadesEnPasoTiempo[0];

      this.posicionesEnPasoTiempo = this.posicionesEnPasoTiempo.slice(1);
      this.velocidadesEnPasoTiempo = this.velocidadesEnPasoTiempo.slice(1);

      this.posicionesEnPasoTiempo.push(primeraLunaPos);
      this.velocidadesEnPasoTiempo.push(primeraLunaVel);

      contador++;
    }
  };

  /**
   * Tras aplicarGravedad, este paso cambia la posicion sumando las velocidades obtenidas
   * de cada luna a las posiciones de estas
   */
  public aplicarVelocidad = () => {
    this.posicionesEnPasoTiempo.map((lunaPos, indice, arr) => {
      this.posicionesEnPasoTiempo[indice].posX += this.velocidadesEnPasoTiempo[
        indice
      ].velX;
      this.posicionesEnPasoTiempo[indice].posY += this.velocidadesEnPasoTiempo[
        indice
      ].velY;
      this.posicionesEnPasoTiempo[indice].posZ += this.velocidadesEnPasoTiempo[
        indice
      ].velZ;
    });
  };
}

let prueba = new Dia12();
