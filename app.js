const express = require('express');
const { engine } = require('express-handlebars');
const { createServer } = require('http');
const { Server } = require('socket.io');
const productsRouter = require('./src/routes/products.routes');
const cartsRouter = require('./src/routes/carts.routes');
const ProductManager = require('./src/models/ProductManager');

const app = express();

// Rutas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Servidor HTTP y WebSockets
const server = createServer(app);
const io = new Server(server);

// Instancia de ProductManager
const productManager = new ProductManager('./src/data/products.json'); 

// WebSockets
io.on('connection', async (socket) => {
    console.log('Un cliente se conectó');

    // Emitir la lista de productos inicialmente
    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    // Evento para actualizar producto
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

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta principal para ver productos
app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

// Ruta para la vista en tiempo real
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Iniciar servidor
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
