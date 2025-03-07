const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validar que no exista un usuario con el mismo email
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'El email ya está registrado.' });

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Verificar contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        // Generar token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
