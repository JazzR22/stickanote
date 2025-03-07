const express = require('express');
const { createWidget, getWidgets, updateWidget, deleteWidget } = require('../controllers/widgetController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas protegidas para los widgets
router.post('/', authMiddleware, createWidget);      // Crear un widget
router.get('/', authMiddleware, getWidgets);         // Obtener todos los widgets del usuario
router.put('/:id', authMiddleware, updateWidget);    // Actualizar un widget
router.delete('/:id', authMiddleware, deleteWidget); // Eliminar un widget

module.exports = router;
