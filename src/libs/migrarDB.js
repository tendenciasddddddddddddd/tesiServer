import Matriculas from "../models/Matriculas";
import Respaldo from "../models/Respaldo";
import Temporal from "../models/Temporal";

export const migracionMatricula = async ()=>{
    Matriculas.find().then((colecciones) => {
      colecciones.forEach((array) => {
        const nuewData = Respaldo(array);
        nuewData.isNew = true;  
        nuewData.save();
       
      });
    });
    console.log('migracion creada');
}
export const temporalMatricula = async ()=>{
    Matriculas.find().then((colecciones) => {
      colecciones.forEach((array) => {
        const nuewData = Temporal(array);
        nuewData.isNew = true;  
        nuewData.save();
       
      });
    });
    console.log('temporal creada');
}

//-------------------ELIMINAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------

export const deleteMatriculasMany = async ()=>{
    try {
      await Matriculas.deleteMany();
      console.log('temporal creada');
    } catch (e) {
        console.log('ERROR EN ELIMINACION');
    }
  }

