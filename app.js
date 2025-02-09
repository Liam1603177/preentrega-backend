const express = require('express');
const app = express();
const productsRouter = require('./src/routes/products.routes'); 
const cartsRouter = require('./src/routes/carts.routes'); 

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
