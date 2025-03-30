const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = {};

        if (query) {
            if (query === "available") {
                filter.status = true;
            } else {
                filter.category = query;
            }
        }

        
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
        };

        
        const products = await Product.paginate(filter, options);

        res.json({
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});


router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});


router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});


router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});


router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(pid);
        if (deletedProduct) {
            res.status(200).json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;
