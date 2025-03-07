const Widget = require('../models/Widget');

// Crear un nuevo widget
exports.createWidget = async (req, res) => {
    try {
        const { type, position, data } = req.body;
        const newWidget = new Widget({
            user: req.user.id, // El usuario autenticado
            type,
            position,
            data
        });

        await newWidget.save();
        res.status(201).json(newWidget);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el widget', error });
    }
};

// Obtener todos los widgets del usuario autenticado
exports.getWidgets = async (req, res) => {
    try {
        const widgets = await Widget.find({ user: req.user.id });
        res.status(200).json(widgets);
    } catch (error) {
        console.error("Error al obtener los widgets:", error);
        res.status(500).json({ message: "Error al obtener los widgets", error });
    }
};

// Actualizar un widget
exports.updateWidget = async (req, res) => {
    try {
        const { id } = req.params;
        const widget = await Widget.findOne({ _id: id, user: req.user.id });

        if (!widget) {
            return res.status(404).json({ message: 'Widget no encontrado' });
        }

        Object.assign(widget, req.body);
        await widget.save();

        res.status(200).json(widget);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el widget', error });
    }
};

// Eliminar un widget
exports.deleteWidget = async (req, res) => {
    try {
        const { id } = req.params;
        const widget = await Widget.findOneAndDelete({ _id: id, user: req.user.id });

        if (!widget) {
            return res.status(404).json({ message: 'Widget no encontrado' });
        }

        res.status(200).json({ message: 'Widget eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el widget', error });
    }
};
