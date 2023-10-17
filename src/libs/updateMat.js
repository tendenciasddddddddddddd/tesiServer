import Matriculas from "../models/Matriculas";

export const updateNumMatricula = async () => {
    let numMatriculas = 0
    Matriculas.find().then((coleccion) => {
        coleccion?.forEach( async (coleccion1) => {
            coleccion1?.matriculas?.forEach((matricula) => {
                numMatriculas = numMatriculas + 1 
                let folio = Math.ceil(numMatriculas / 2)
                matricula.nmatricula = numMatriculas
                matricula.folio = folio
                //console.log(matricula.nmatricula, matricula.folio)
            });
            console.log(coleccion1._id)
            await Matriculas.findByIdAndUpdate(coleccion1._id, coleccion1);
        });
    });
    console.log('EDICION EXITOSA');
}