const Asignatura = require('../models/asignacion.model');

function ObtenerAsignatura(req, res) {
    Asignatura.find({}, (err, idCursos) => {
        return res.send({ asignatura: idCursos })
    })
}

function RegistrarAsignatura(req, res) {
    var parametros = req.body;
    var modeloAsignatura = new Asignatura();
    if(parametros.idCursos && parametros.idUsuario) {
        Asignatura.find({ idUsuario : parametros.idUsuario}, (err, idCursos) => {
                if (idCursos.length > 3){ 
                    return res.status(500)
                        .send({ mensaje: "Se ha superado el limite de Asi" })
                } else {
                    modeloAsignatura.idUsuario = parametros.idUsuario;
                    modeloAsignatura.idCursos =  idCursos.push(parametros.idCursos);
                    modeloAsignatura.save((err, asignaturaGuardado) => {
                        if (err) return res.status(500).send({mensaje: "Error de peticion"})
                        if (!asignaturaGuardado) return res.status(500).send({mensaje: "Error al guardar"})
                        return res.status(200).send({asignatura: asignaturaGuardado})
                    });
                }
            })
    } else {
        return res.status(404).send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }
}




module.exports = {
    RegistrarAsignatura,
    ObtenerAsignatura

}