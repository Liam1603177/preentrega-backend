const express = require('express');
const { engine } = require('express-handlebars');
const { createServer } = require('http');
const { Server } = require('socket.io');
const productsRouter = require('./src/routes/products.routes');
const cartsRouter = require('./src/routes/carts.routes');
const ProductManager = require('./src/models/ProductManager');
const sessionsRouter = require('./src/routes/sessions.routes');
const cookieParser = require('cookie-parser');
const passport = require('passport'); // Corrección: Importar passport directamente
const initializePassport = require('./src/config/passport.config');
const app = express();

// Configuración de Passport
initializePassport();
app.use(passport.initialize());

// Configuración de middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configuración de rutas
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta principal para ver productos
app.get('/', async (req, res) => {
    const productManager = new ProductManager('./src/data/products.json');
    const products = await productManager.getProducts();
    res.render('home', { products });
});

// Ruta para la vista en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Conexión a MongoDB
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "sample_mflix",
        });
        console.log("🔥 Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
    }
};

connectDB();

// Configuración del servidor HTTP y WebSockets
const server = createServer(app);
const io = new Server(server);

// WebSockets
io.on('connection', async (socket) => {
    console.log('Un cliente se conectó');
    const productManager = new ProductManager('./src/data/products.json');

    // Emitir la lista de productos inicialmente
    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    // Evento para agregar nuevo producto
    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });

    // Evento para eliminar producto
    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        const updatedProducts = await productManager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });
});

// Iniciar servidor
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
