const express = require('express');
const router = express.Router();
const productService = require('../src/productService');

router.get('/', async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  const newProduct = await productService.createProduct(nombre, precio);
  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  const updatedProduct = await productService.updateProductById(id, nombre, precio);

  if (updatedProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProductById(id);

  if (deletedProduct) {
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
