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
 */

import { codigosOrbitas } from "./codigosOrbitas";

class Dia6 {
  
    // debe dar 42
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

  public objetosSatelites: any[];

  public codOrbitas = codigosOrbitas.splice(0);

  public orbitas: number = 0;
  public pasosHastaSanta: number = 0;

  public objetos: any[] = [];
  public satelites: any[] = [];

  constructor() {

    this.objetosSatelites = [];
    
    this.codOrbitas.map(orbitaD => {
      let objetoSatelite = orbitaD.split(")");

      let objeto = objetoSatelite[0];
      let satelite = objetoSatelite[1];

      this.objetosSatelites.push([objeto, satelite]);
      this.objetos.push(objeto);
      this.satelites.push(satelite);
     
    });

    // Cada sat ir contando hasta el centro de la galaxia "COM"
    // (mientras objSat[0] != "COM"), buscar el satelite
    // Un satelite SOLO PUEDE ORBITAR a UN planeta/satelite, logicamente
   
    this.satelites.map(sat => {

      while (sat !== "COM") {

        this.orbitas++;         
        sat = this.hastaElCentro(sat);   
      }
    });

    console.log("Respuesta Ej1 -> %o", this.orbitas);

  }

  /**
   * Devuelve el planeta/satelite al que orbita el que le llega por parametro
   * Ej: A)B  -> le llega B por parametro, entonces busca ese entre los satelites y devuelve su planeta que es A
   * @param sat 
   */
  public hastaElCentro(sat: string): string {
    
    let encontrado = this.objetosSatelites.find(objSat => {
        if(objSat[1] === sat){
            return objSat;
        }
    });
    return encontrado[0];
  }

}

let ejercicio1 = new Dia6();