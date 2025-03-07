require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const widgetRoutes = require('./routes/widgetRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/widgets', widgetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
