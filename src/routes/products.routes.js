const express = require('express');
const router = express.Router();
const ProductManager = require('../models/ProductManager');

const productManager = new ProductManager('./src/data/products.json');


router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});
router.post('/', async (req, res) => {
    console.log("Cuerpo de la solicitud:", req.body);

    const { title, price, stock, category, description = "", code = "", thumbnails = [], status = true } = req.body;

    // Solo se requieren algunos campos clave
    if (!title || !price || !stock || !category) {
        return res.status(400).json({ error: 'Los campos title, price, stock y category son obligatorios' });
    }

    const newProduct = { title, description, code, price, stock, category, thumbnails, status };

    try {
        const addedProduct = await productManager.addProduct(newProduct);
        res.status(201).json(addedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});


router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedData = req.body;
    const updatedProduct = await productManager.updateProduct(pid, updatedData);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }

});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const result = await productManager.deleteProduct(pid);
    if (result) {
        res.status(200).json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;
