"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.general = void 0;

var general = () => {
  var formarNomina = array => {
    try {
      var a = [];
      var fechaA = fechaActual();

      for (var i = 0; i < array.length; i++) {
        var element = array[i].matriculas;
        if (element.length == 0) continue;
        var paralelo = array[i].paralelo;
        var curso = array[i].curso;
        var periodo = array[i].periodo;
        var subdata = [];

        for (var j = 0; j < element.length; j++) {
          var element2 = element[j].estudiante;
          var data = {
            fullname: element2.fullname,
            cedula: element2.cedula,
            nmatricula: element[j].nmatricula
          };
          subdata.push(data);
        }

        var ordenName = subdata.sort(function (a, b) {
          var nameA = a.fullname.toLowerCase(),
              nameB = b.fullname.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        var model = {
          curso: curso,
          periodo: periodo,
          paralelo: paralelo,
          data: ordenName,
          orden: curso.num,
          fechaA: fechaA
        };
        a.push(model);
      }

      var orden = a.sort((a, b) => parseFloat(a.orden) - parseFloat(b.orden));
      return orden;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formarNomina
  };
};

exports.general = general;

var fechaActual = () => {
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var dateObj = new Date();
  var month = monthNames[dateObj.getMonth()];
  var day = String(dateObj.getDate()).padStart(2, '0');
  var year = dateObj.getFullYear();
  var output = day + " de " + month + '\n' + ' del ' + year;
  return output;
};