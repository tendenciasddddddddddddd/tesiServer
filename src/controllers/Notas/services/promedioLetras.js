export const promedioLetras = () => {

    function calcularPromedioInsumos (p1, p2, py) {
        let aux = 0;
        let aux2 = 0;
        let aux3 = 0;
        switch (p1) {
            case "EX": aux = 5;
                break;
            case "MB": aux = 4;
                break;
            case "B": aux = 3;
                break;
            case "R": aux = 2;
                break;
            default:
                break;
        }
        switch (p2) {
            case "EX": aux2 = 5;
                break;
            case "MB": aux2 = 4;
                break;
            case "B": aux2 = 3;
                break;
            case "R": aux2 = 2;
                break;
            default:
                break;
        }
        switch (py) {
            case "EX": aux3 = 5;
                break;
            case "MB": aux3 = 4;
                break;
            case "B": aux3 = 3;
                break;
            case "R": aux3 = 2;
                break;
            default:
                break;
        }
        var result = parseInt((aux + aux2 + aux3) / 3)
        var letra = ''
        switch (result) {
            case 5: letra = 'EX';
                break;
            case 4: letra = 'MB';
                break;
            case 3: letra = 'B';
                break;
            case 2: letra = 'R';
                break;
            default:
                break;
        }
        return letra;
    }
    var calcPrimerParcial = (p1, p2 ,py1) => {
        const nota1 = p1 ? p1.toString().replace(",", ".") : ''
        const nota2 = p2 ? p2.toString().replace(",", ".") : ''
        const nota3 = py1 ? py1.toString().replace(",", ".") : ''
        let result = calcularPromedioInsumos(nota1, nota2, nota3)
      return result;
    };
    return { calcPrimerParcial}
  };