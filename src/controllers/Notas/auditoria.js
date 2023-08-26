import LogsNotas from "../../models/LogsNotas";
import Distributivo from "../../models/distributivos/Distributivo";
export const auditoria = () => {
    async function inyectAuditoria(data) {
        try {
            if (data.usuario.id === '64533ad6f943762f1a5ff534') return
            const model = {
                fkUser: data.usuario.id,
                nombre: data.usuario.name,
                iP: data.term,
                navegador: data.navegador,
                fkcurso: data.fkcurso,
                detalle: data.materia
            }
            await LogsNotas.create(model)
        } catch (error) {

        }
    }
    async function saveProgreso (id, model, idCarga) {
        try {
            await Distributivo.updateOne({ _id: id }, { $set: { "carga.$[perf].porsentajes": model.reg } },
              {
                arrayFilters: [{
                  "perf._id": { $eq: idCarga }
                }],
                new: true,
              });
            inyectAuditoria(model)
          } catch (error) {
            console.log(error);
          }
    }
    return { saveProgreso}
};