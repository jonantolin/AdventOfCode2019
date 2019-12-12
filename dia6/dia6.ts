// Dia 6

/**
 * Ejercicio 1
 * 
 * Calcular las orbitas directas e indirectas
 * 
 * Ejemplo: 
 * 
 * Este ejemplo tiene 42 orbitas totales
 * 
 * COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L

            G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I

  Ejercicio 2:

  Calcular la los movimientos necesarios entre YOU y SAN.
  En el ejemplo, YOU orbita a K, y SAN orbita a I.
  De YOU a SAN hay 4 movimientos (sin incluir YOU y SAN)
 */

import { codigosOrbitas } from "./codigosOrbitas";
import { CalculadoresOrbitales } from "./calculadoresOrbitales";

class Dia6 extends CalculadoresOrbitales {
  public prueba = [];
  public ejemplo = [
    "COM)B",
    "B)C",
    "C)D",
    "D)E",
    "E)F",
    "B)G",
    "G)H",
    "D)I",
    "E)J",
    "J)K",
    "K)L"
  ];

  public ejemploEj2 = [
    "COM)B",
    "B)C",
    "C)D",
    "D)E",
    "E)F",
    "B)G",
    "G)H",
    "D)I",
    "E)J",
    "J)K",
    "K)L",
    "K)YOU",
    "I)SAN"
  ];

  public objetosSatelites: Array<string>[];
  public codOrbitas = codigosOrbitas.splice(0);
  public orbitas: number = 0;
  public satelites: string[] = [];
  public planetas: string[] = [];

  constructor() {
    super();
    this.objetosSatelites = [];

    this.codOrbitas.map(orbitaD => {
      let objetoSatelite = orbitaD.split(")");

      let objeto = objetoSatelite[0];
      let satelite = objetoSatelite[1];

      this.objetosSatelites.push([objeto, satelite]);
      this.planetas.push(objeto);
      this.satelites.push(satelite);
    });

    // Ejercicio 1
    this.calcularOrbitas();

    // Ejercicio 2
    this.yoHastaSanta();
  }
}

let ejercicio1 = new Dia6();
