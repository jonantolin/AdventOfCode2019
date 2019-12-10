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

  public objetosSatelites: any[];

  public codOrbitas = codigosOrbitas.splice(0);

  public orbitas: number = 0;

  constructor() {
    // PRUEBAS
    let satelitesSolo: string[] = [];
    this.objetosSatelites = [];

    let objetos: string[] = [];
    let satelites: string[] = [];
    let centroGalaxia: string;
    this.ejemplo.map(orbitaD => {
      let objetoSatelite = orbitaD.split(")");

      let objeto = objetoSatelite[0];
      let satelite = objetoSatelite[1];

      this.objetosSatelites.push([objeto, satelite]);
      objetos.push(objeto);
      satelites.push(satelite);
      //console.log("%o satelite => %o", objeto, satelite);
    });

    /*
    objetosSatelites.map(orb => {
      satelitesSolo = objetosSatelites.filter(objSat => {
        return objSat[1] === orb[0];
      });
    });
    */

    objetos.map(obj => {
      let encontrado = satelites.find(sat => {
        return sat === obj;
      });
      if (encontrado == undefined) {
        centroGalaxia = obj;
        console.log("Centro galaxia -> %o", obj);
      }
    });

    // Satelites que no tienen mas satelites orbitandoles
    satelites.map(sat => {
      let encontrado = this.objetosSatelites.find(objSat => {
        return objSat[0] === sat;
      });
      if (encontrado == undefined) {
        satelitesSolo.push(sat);
      }
    });

    // Cada sat solitario ir contando hasta el centro de la galaxia "COM"
    // (mientras objSat[0] != "COM"), buscar el satelite
    // Un satelite SOLO PUEDE ORBITAR a UN planeta/satelite, logicamente

    /*
    satelitesSolo.map(sat => {
        this.orbitas++;
        objetosSatelites.map(objSat =>{

            if(objSat[1] === sat){
                this.orbitas++;
                objetosSatelites.map( objSat2 => {

                });
            }
        });
        
    });
    */

    // TODO revisar
    satelitesSolo.map(sat => {
      let planeta: string;
      while (planeta != "COM") {
        planeta = this.hastaElCentro(sat);
      }
    });

    console.log("Satelites sin satelites -> %o", satelitesSolo);

    console.log(this.orbitas);

    //console.log("satelites sin que les orbiten -> %o", satelitesSolo);
  }

  public hastaElCentro(objeto): string {
    //TODO aqui buscar donde planeta sea satelite en objetosSatelites y devolver el objeto
    let encontrado = this.objetosSatelites.find(objSat => {
      return objSat[1] === objeto;
    });
    if (encontrado) {
      this.orbitas++;
    }
    return encontrado;
  }
}

let ejercicio1 = new Dia6();
