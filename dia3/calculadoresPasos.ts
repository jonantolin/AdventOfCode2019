/**
 * Devuelve un array con los puntos de parada del cable y los pasos dados por cada punto de parada
 * @param movimientos Las ordenes de movimiento recibidas
 */
function calcularPuntosPasosCable(movimientos: string[]): object[]{


    let x: number = 0;
    let y: number = 0;
    let pasos: number = 0;
    let puntosPasosCable: object[] = [];

    puntosPasosCable = movimientos.map(mov => {

        let direccion = mov.charAt(0);
        let movimiento = +mov.slice(1);
        pasos += +mov.slice(1);

        switch(direccion){

            case 'R': 
                x += movimiento;
                break;
            case 'L':
                x -= movimiento;
                break;
            case 'U':
                y += movimiento;
                break;
            case 'D':
                y -= movimiento;
                break;
        }

        return {x, y, pasos};
    });

    puntosPasosCable.unshift({x: 0, y: 0, pasos: 0});

    return puntosPasosCable;

}

/**
 * Calcula y devuelve un array ordenado de menor a mayor en el que cada elemento es la suma de pasos de cada cable necesarios
 *  para llegar a cada interseccion de los dos cables
 * @param intersecciones 
 * @param movimientosC1 
 * @param movimientosC2 
 */
export function calcularPasosOptimos(intersecciones: any[], movimientosC1: string[], movimientosC2: string[]): number[]{

    let puntosPasosCable1: any[] = [];
    let puntosPasosCable2: any[] = [];
    let pasosIntersecciones: number[] = [];

    puntosPasosCable1 = calcularPuntosPasosCable(movimientosC1);
    puntosPasosCable2 = calcularPuntosPasosCable(movimientosC2);

    intersecciones.map( inter => {

       let encontradaC1: boolean = false;
       let contadorC1 = 0;
       let pasosC1 = 0;
       let pasosC2 = 0;
       
       while(!encontradaC1 && puntosPasosCable1[contadorC1 + 1] != undefined){

            // true si cable1 se ha movido horizontalmente
            // Entonces el otro cable en la interseccion se movio verticalmente y viceversa
            if(puntosPasosCable1[contadorC1].y == puntosPasosCable1[contadorC1 + 1].y ){

                // Debo ordenar la coor del punto y del punto siguiente antes de mirar si la interseccion esta contenida en ellos,
                // porque puede ir de derecha a izquierda o tener un valor negativo uno de ellos
                let auxX = [puntosPasosCable1[contadorC1].x, puntosPasosCable1[contadorC1 + 1].x].sort((a, b) => a - b );

                if(inter[0] > auxX[0] && inter[0] < auxX[1]
                    && inter[1] == puntosPasosCable1[contadorC1].y){

                    // esto porque no se el signo de cada punto    
                    pasosC1 = Math.abs(Math.abs(inter[0]) - Math.abs(puntosPasosCable1[contadorC1].x)) + puntosPasosCable1[contadorC1].pasos;    

                    // Ya tengo los pasos del cable1 hasta la interseccion actual, ahora calcular los del cable2
                    puntosPasosCable2.map((puntoC2, index, arr) => {

                        if(arr[index +1] != undefined){

                            let auxY = [puntoC2.y, arr[index + 1].y].sort((a, b) => a - b );

                            if(inter[1] > auxY[0] && inter[1] < auxY[1] && puntoC2.x === inter[0]){

                                pasosC2 = Math.abs(Math.abs(inter[1]) - Math.abs(puntoC2.y)) + puntoC2.pasos;

                                // tengo los dos pasos de cables, sumo y agrego al array
                                pasosIntersecciones.push(pasosC1 + pasosC2);
                            }
                        }

                    });
                    encontradaC1 = true;
                    
                }

            }else{
                //Aqui hago lo mismo pero para cable1 se ha movido vertical,entonces cable2 horizontal en la interseccion

                let auxY = [puntosPasosCable1[contadorC1].y, puntosPasosCable1[contadorC1 + 1].y].sort((a, b) => a - b );

                if(inter[1] > auxY[0] && inter[1] < auxY[1]
                     && inter[0] == puntosPasosCable1[contadorC1].x){

                    pasosC1 = Math.abs(Math.abs(inter[1]) - Math.abs(puntosPasosCable1[contadorC1].y)) + puntosPasosCable1[contadorC1].pasos;    

                    puntosPasosCable2.map((puntoC2, index, arr) => {

                        if(arr[index +1] != undefined){

                            let auxX = [puntoC2.x, arr[index + 1].x].sort((a, b) => a - b );

                            if(inter[0] > auxX[0] && inter[0] < auxX[1] && puntoC2.y === inter[1]){

                                pasosC2 = Math.abs(Math.abs(inter[0]) - Math.abs(puntoC2.x)) + puntoC2.pasos;

                                pasosIntersecciones.push(pasosC1 + pasosC2);
                            }
                        }


                    });

                    encontradaC1 = true;
                    
                }
            }   
            contadorC1++;
       }

    });

    return pasosIntersecciones.sort((a, b) => a - b );

}