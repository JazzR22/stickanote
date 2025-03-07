const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.error("❌ Error al verificar el token:", error);
        return res.status(400).json({ message: "Token no válido." });
    }
};

module.exports = authMiddleware;
