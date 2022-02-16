const Cursos = require('../models/curso.model');

function ObtenerCursos (req, res) {
    Cursos.find({}, (err, cursosEncontrados) => {
        return res.send({ curso: cursosEncontrados })
    })
}

function AgregarCurso(req, res) {
    var idProf = req.params.idProfesor;
    var parametros = req.body;
    var modeloCurso = new Cursos();
    if(  req.user.rol == 'MAESTRO' ){
        modeloCurso.nombre = parametros.nombre;
        modeloCurso.idProfesor = req.user.sub; 
        modeloCurso.save((err, cursoGuardado) => {
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
            if(!cursoGuardado) return res.status(500).send({ mensaje: 'Error al agregar la Encuesta'})
            return res.status(200).send({ curso: cursoGuardado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Debe ingresar los parametros obligatorios' });
    }
}


function EliminarCurso(req, res) {
    var idCur = req.params.idCursos;
    if(req.user.rol !== 'MAESTRO' ) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para eliminar este Curso.' });
    }else{
    Cursos.findByIdAndDelete(idCur, (err, cursoEliminado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!cursoEliminado)
        return res.status(500).send({ mensaje: "Error al eliminar el usuario" });
        return res.status(200).send({ curso: cursoEliminado });
    });
}
}


function EditarCurso(req, res) {
    var idCur = req.params.idCursos;
    var parametros = req.body;

    if( req.user.rol !== 'MAESTRO') {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Curso.' });
    }
    Cursos.findByIdAndUpdate(idCur, parametros, {new: true}, (err, cursoEditado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!cursoEditado) return res.status(500).send({mensaje: 'Error al editar el Usuario'});

        return res.status(200).send({ curso: cursoEditado });
    })
}



module.exports = {
    AgregarCurso,
    ObtenerCursos,
    EliminarCurso,
    EditarCurso
}