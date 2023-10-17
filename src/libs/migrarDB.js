import Matriculas from "../models/Matriculas";
import Mat2023 from "../models/history/Mat2023";
import Dis2023 from "../models/history/Dis2023";
import Temporal from "../models/Temporal";
import Distributivo from "../models/distributivos/Distributivo";

export const migracionMatricula = async ()=>{
  Temporal.find().then((colecciones) => {
      colecciones.forEach((array) => {
        const nuewData = Mat2023(array);
        nuewData.isNew = true;  
        nuewData.save();
       
      });
    });
    console.log('migracion creada');
}

export const migracionDistributivo = async ()=>{
  Distributivo.find().then((colecciones) => {
      colecciones.forEach((array) => {
        const nuewData = Dis2023(array);
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
      console.log('coleccion eliminada');
    } catch (e) {
        console.log('ERROR EN ELIMINACION');
    }
  }

