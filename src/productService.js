const db = require('../db');

const productService = {
  getAllProducts: async () => {
    const [rows] = await db.promise().query('SELECT * FROM productos');
    return rows;
  },
  
  getProductById: async (id) => {
    const [rows] = await db.promise().query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  },
  
  createProduct: async (nombre, precio) => {
    const [result] = await db.promise().query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio]);
    const [newProduct] = await db.promise().query('SELECT * FROM productos WHERE id = ?', [result.insertId]);
    return newProduct[0];
  },
  
  updateProductById: async (id, nombre, precio) => {
    await db.promise().query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id]);
    const [updatedProduct] = await db.promise().query('SELECT * FROM productos WHERE id = ?', [id]);
    return updatedProduct[0];
  },
  
  deleteProductById: async (id) => {
    const [deletedProduct] = await db.promise().query('DELETE FROM productos WHERE id = ?', [id]);
    return deletedProduct.affectedRows > 0 ? deletedProduct : null;
  },
};

module.exports = productService;
