import ProductManager from '../dao/mongo/managers/ProductManager.js';
const productManager = new ProductManager();

export const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category, stock } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (stock) filter.stock = { $gt: stock };
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined
    };

    const products = await productManager.getProducts(filter, options);
    res.json(products);
  } catch (error) { console.error(error)
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productManager.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto', details: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productManager.updateProduct(req.params.pid, req.body);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.pid);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
