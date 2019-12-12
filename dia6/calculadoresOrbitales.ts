export class CalculadoresOrbitales {
  [x: string]: any;

  /**
   * Recibe un planeta/satelite como parametro, lo busca como satelite y devuelve el planeta de este satelite
   * Por ejemplo: A)B , en este caso recibe B como parametro y devuelve A
   * @param objeto es el astro que se buscara
   */
  public buscarPlanetaDe(astro): string {
    let encontrado = this.objetosSatelites.find(objSat => {
      return objSat[1] === astro;
    });
    return encontrado[0];
  }

  /**
   * Cada satelite ir contando hasta el centro de la galaxia "COM"
   * mientras el planeta del satelite sea != "COM", buscar este planeta como satelite
   * y de este buscar este planeta como satelite, hasta que el planeta sea "COM".
   * Un satelite SOLO PUEDE ORBITAR a UN planeta/satelite, logicamente
   */
  public calcularOrbitas() {
    this.satelites.map(astro => {
      while (astro !== "COM") {
        astro = this.buscarPlanetaDe(astro);
        this.orbitas++;
      }
    });

    console.log("Respuesta Ej1 -> %o", this.orbitas);
  }

  /**
   * Calcula el astro comun por el que orbitan indirectamente Santa("SAN") y yo("YOU"),
   * luego calcula las orbitas de cada uno hasta ese planeta comun.
   * Imprime la suma de estas orbitas, que obviamente el resultado es el mismo que el de numero de orbitas(movimientos) de un punto a ootro
   */
  public yoHastaSanta() {
    let yo = "YOU";
    let santa = "SAN";

    let primerPlanetaYo = this.buscarPlanetaDe(yo);
    let primerPlanetaSanta = this.buscarPlanetaDe(santa);

    let planetaYo = primerPlanetaYo;
    let planetaSanta = primerPlanetaSanta;

    let orbitasHastaComunYo = 0;
    let orbitasHastaComunSanta = 0;

    // orbitasHastaComunYo + orbitasHastaComunSanta
    let pasosEntreYoSanta = 0;

    let planetasPasaYo: any[] = [];
    let planetasPasaSanta: any[] = [];

    while (planetaYo !== "COM") {
      planetasPasaYo.push(planetaYo);
      planetaYo = this.buscarPlanetaDe(planetaYo);
    }

    while (planetaSanta !== "COM") {
      planetasPasaSanta.push(planetaSanta);
      planetaSanta = this.buscarPlanetaDe(planetaSanta);
    }

    let primerAstroComun: string;
    let encontrado: boolean = false;
    let contador: number = 0;

    // Encuentro el primer resultado en los planetas de Santa, que es el planeta comun
    while (!encontrado) {
      primerAstroComun = planetasPasaSanta.find(
        planeta => planetasPasaYo[contador] === planeta
      );

      if (primerAstroComun != undefined) {
        encontrado = true;
      }
      contador++;
    }

    //console.log("primer astro comun -> %o", primerAstroComun);
    //console.log("planetas yo -> %o", planetasPasaYo);
    //console.log("planetas santa ->%o", planetasPasaSanta);

    planetaYo = primerPlanetaYo;
    while (planetaYo !== primerAstroComun) {
      planetaYo = this.buscarPlanetaDe(planetaYo);

      orbitasHastaComunYo++;
    }

    //console.log("hasta comun YO -> %o", orbitasHastaComunYo);

    planetaSanta = primerPlanetaSanta;
    while (planetaSanta !== primerAstroComun) {
      planetaSanta = this.buscarPlanetaDe(planetaSanta);

      orbitasHastaComunSanta++;
    }

    //console.log("hasta comun SANTA -> %o", orbitasHastaComunSanta);

    pasosEntreYoSanta = orbitasHastaComunYo + orbitasHastaComunSanta;

    console.log("Respuesta Ej2 -> %o", pasosEntreYoSanta);
  }
}
