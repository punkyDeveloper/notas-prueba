"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuario = exports.eliminarUsuario = exports.actualizarUsuario = exports.Registrar = void 0;
const registrar_1 = __importDefault(require("../moduls/registrar"));
// Define the Registrar function
const Registrar = async (req, res) => {
    try {
        const { name, correo, contrasena } = req.body;
        // Validar que todos los campos estén presentes
        if (!name || !correo || !contrasena) {
            res.status(400).json({ error: 'Por favor ingresa todos los datos.' });
            return;
        }
        // Buscar si ya existe un usuario con el mismo correo
        const existingUser = await registrar_1.default.findOne({ email: correo });
        if (existingUser) {
            res.status(400).json({ error: 'El correo ya está registrado. Por favor usa otro.' });
            return;
        }
        // Si el correo no está registrado, crear un nuevo usuario
        const newUser = new registrar_1.default({
            fullName: name,
            email: correo,
            password: contrasena,
        });
        // Guardar el nuevo usuario en la base de datos
        await newUser.save();
        // Responder con éxito
        res.status(201).json({
            message: 'Usuario registrado correctamente!',
            user: newUser,
        });
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Ocurrió un error al registrar el usuario.' });
    }
};
exports.Registrar = Registrar;
// Actualizar 
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body;
    console.log(nombre, correo, contrasena);
    try {
        // Buscar el usuario por ID
        const user = await registrar_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Actualizar los campos, asegurando que los nombres coincidan con el modelo
        if (nombre)
            user.fullName = nombre;
        if (correo)
            user.email = correo;
        if (contrasena) {
            // Asegúrate de encriptar la contraseña si es necesario
            user.password = contrasena; // Recuerda que deberías encriptar esto antes de guardar
        }
        // Guardar los cambios en la base de datos
        const updatedUser = await user.save();
        console.log(updatedUser);
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    }
    catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};
exports.actualizarUsuario = actualizarUsuario;
// Eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log("hola");
        // Buscar el usuario por su ID y eliminarlo
        const deletedUser = await registrar_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};
exports.eliminarUsuario = eliminarUsuario;
// Obtener la información de un usuario por su ID
const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await registrar_1.default.findById(id);
        if (!usuario) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json(usuario);
    }
    catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
exports.obtenerUsuario = obtenerUsuario;
