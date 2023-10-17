export const general = () => {
    const formarNomina = (array) => {
        try {
            const a = []
            var fechaA = fechaActual()
            for (let i = 0; i < array.length; i++) {
                const element = array[i].matriculas;
                if (element.length == 0) continue;
                const paralelo = array[i].paralelo
                const curso = array[i].curso
                const periodo = array[i].periodo
                const subdata = []
                for (let j = 0; j < element.length; j++) {
                    const element2 = element[j].estudiante;
                    const data = {
                        fullname: element2.fullname,
                        cedula: element2.cedula,
                        nmatricula: element[j].nmatricula,
                    }
                    subdata.push(data)
                }
                const ordenName = subdata.sort(function (a, b) {
                    var nameA = a.fullname.toLowerCase(), nameB = b.fullname.toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                });
                const model = {
                    curso: curso,
                    periodo: periodo,
                    paralelo: paralelo,
                    data: ordenName,
                    orden: curso.num,
                    fechaA: fechaA
                }
                a.push(model)
            }
            const orden = a.sort((a, b) => parseFloat(a.orden) - parseFloat(b.orden));
            return orden
        } catch (error) {
            console.log(error)
        }
    }
    return {
        formarNomina
    }
}

const fechaActual = () => {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day + " de " + month + '\n' + ' del ' + year;
    return output
}