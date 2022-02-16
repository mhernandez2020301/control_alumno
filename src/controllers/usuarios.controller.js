const Usuarios = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function ObtenerAlumnos (req, res) {
    Usuarios.find({}, (err, usuariosEncontrados) => {
        return res.send({ usuario: usuariosEncontrados })
    })
}

function RegistrarAlumno(req, res) {
    var parametros = req.body;
    var modeloUsuarios = new Usuarios();

    if(parametros.nombre && parametros.apellido && parametros.email && parametros.password) {
            Usuarios.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuarios.nombre = parametros.nombre;
                    modeloUsuarios.apellido = parametros.apellido;
                    modeloUsuarios.email = parametros.email;
                    modeloUsuarios.rol = 'ALUMNO';
                    modeloUsuarios.imagen = null;

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuarios.password = passwordEncriptada;

                        modeloUsuarios.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}

function RegistrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuarios();
    if(parametros.nombre && parametros.apellido &&  parametros.email) {
        Usuarios.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.apellido = parametros.apellido;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.password ='123456';
                    modeloUsuario.rol = 'MAESTRO';
                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;
                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500)
                                .send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al guardar el Maestro' })
                            return res.status(200).send({ usuario: usuarioGuardado})
                        })
                    })
                }
            })
    } else {
        return res.status(404).send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }
}


function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    Usuarios.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){

            bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                usuarioEncontrado.password = passwordEncriptada;

                usuarioEncontrado.save((err, usuariosGuardados)=>{
                    if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                    if(!usuariosGuardados) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })

                    return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado)})
                })
            })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}

function EditarUsuarios(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    // BORRAR LA PROPIEDAD DE PASSWORD EN EL BODY
    delete parametros.password

    if( req.user.sub !== idUser) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Usuario.' });
    }

    Usuarios.findByIdAndUpdate(req.user.sub, parametros, {new: true}, (err, usuarioEditado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuarioEditado) return res.status(500).send({mensaje: 'Error al editar el Usuario'});

        return res.status(200).send({ usuario: usuarioEditado });
    })
}

function EliminarUsuarios(req, res) {

    var idUser = req.params.idUsuario;

    if( req.user.sub !== idUser) {
        return res.status(500).send({ mensaje: 'No tiene los permisos para editar este Usuario.' });
    }

    Usuarios.findByIdAndDelete(idUser, (err, usuarioEliminado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (!usuarioEliminado)
        return res.status(500).send({ mensaje: "Error al eliminar el usuario" });
        return res.status(200).send({ usuario: usuarioEliminado });
    });
}


module.exports = {
    RegistrarAlumno,
    RegistrarMaestro,
    Login,
    EditarUsuarios,
    ObtenerAlumnos,
    EliminarUsuarios
}