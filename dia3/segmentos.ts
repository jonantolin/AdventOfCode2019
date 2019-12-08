export function calcularSegmentosCable (movimientos: string[]): {x1:number, y1:number, x2: number, y2:number}[] {

    let puntosParadaCable: {x:number, y:number}[] = []; // [{x: 0, y: 0}, {...},{...}]
    let segmentosCable: {x1:number, y1:number, x2: number, y2:number}[] = []; // [{x1: 0, y1: 0, x2: 0, y2: 0},{...},{...}]
    let x: number = 0;
    let y: number = 0;
    let direccion: string;
    let movimiento: number;

    puntosParadaCable = movimientos.map(mov => {

        direccion = mov.charAt(0);
        movimiento = +mov.slice(1);

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

        return {x, y};
    });

    // inserto el punto de partida 0,0
    puntosParadaCable.unshift({x: 0, y: 0}); 

    segmentosCable = puntosParadaCable.map((punto, index, arr) => {

        if(arr[index + 1] == undefined){
            return;
        }
        
        return {
            x1: punto.x,
            y1: punto.y,
            x2: arr[index +1]['x'],
            y2: arr[index +1]['y']
        };
        
    });
    // elimino el ultimo elemento que como no tiene un siguiente quedaria undefined
    segmentosCable.pop();

    return segmentosCable;
}

export function calcularIntersecciones(segmentosC1: {x1:number, y1:number, x2: number, y2:number}[],
     segmentosC2: {x1:number, y1:number, x2: number, y2:number}[]): Array<number>[] {

    let intersecciones: Array<number>[] = []; // [[3,4],[21,5],[...],[...]]

    segmentosC1.map(s1 => {

        let x: number = null;
        let y: number = null;

        segmentosC2.map( s2 => {

            // (x1 - x2)(y3 - y4) - (y1 - y2)(x3 - x4) = 0 son paralelas o coincidentes

            if((s1.x1 - s1.x2)*(s2.y1 - s2.y2) - (s1.y1 - s1.y2) * (s2.x1 - s2.x2) === 0){
                return;
            }else{ 

                // Punto de interseccion entre 2 rectas (OJO, rectas infinitas)
                x = ((s1.x1 * s1.y2 - s1.y1 * s1.x2) * (s2.x1 - s2.x2) - (s1.x1 - s1.x2) * (s2.x1 * s2.y2 - s2.y1 * s2.x2))
                / ((s1.x1 - s1.x2)*(s2.y1 - s2.y2) - (s1.y1 - s1.y2) * (s2.x1 - s2.x2));

                y = ((s1.x1 * s1.y2 - s1.y1 * s1.x2) * (s2.y1 - s2.y2) - (s1.y1 - s1.y2) * (s2.x1 * s2.y2 - s2.y1 * s2.x2))
                / ((s1.x1 - s1.x2)*(s2.y1 - s2.y2) - (s1.y1 - s1.y2) * (s2.x1 - s2.x2));
                

                // segun si el segmento actual del cable1 es vertical u horizontal, el punto de interseccion se comprobará y coincidirá en un eje u otro del otro segmento
                // Si es horizontal: el punto de interseccion debe estar entre el inicio y final del eje X de este segmento y el inicio y final del eje Y del segmento del cable2
                // Si es vertical: el punto de interseccion debe estar entre el inicio y final del eje X del segmento del cable2 y el inicio y final del eje Y del segmento del cable1

                // el segmento del cable1 es horizontal, por tanto el otro es vertical, si no, viceversa  
                if(s1.y1 === s1.y2){

                    let auxX = [s1.x1, s1.x2].sort((a, b) => a - b );
                    let auxY = [s2.y1, s2.y2].sort((a, b) => a - b );

                    if( x > auxX[0] && x < auxX[1] && y > auxY[0] && y < auxY[1]){
                        if([x, y] !== [0, 0]){
                            intersecciones.push([x, y]);
                        }
                    }

                }else{
                    let auxX = [s2.x1, s2.x2].sort((a, b) => a - b );
                    let auxY = [s1.y1, s1.y2].sort((a, b) => a - b );

                    if( x > auxX[0] && x < auxX[1] && y > auxY[0] && y < auxY[1]){
                        if([x, y] !== [0, 0]){
                            intersecciones.push([x, y]);
                        }
                    }
                }

            }
        });

    });

    return intersecciones;
}

export function calcularDistancias(intersecciones: Array<number>[]): number[]{

    let distancias: number[] = [];
    let puntoPartida: number[] = [0, 0];

    distancias = intersecciones.map(interPunto => {

        // |x1 - x2| + |y1 - y2|
        return Math.abs(puntoPartida[0] - interPunto[0]) + Math.abs(puntoPartida[1] - interPunto[1]);
    });


    distancias.sort((a, b) => a - b );


    return distancias;

}