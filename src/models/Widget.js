const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['pizarra', 'post-it', 'checkbox', 'cronometro', 'reloj'],
        required: true,
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Puede ser texto, booleano, etc.
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Widget', widgetSchema);
