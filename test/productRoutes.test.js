const request = require('supertest');
const app = require('../app');

describe('CRUD de Productos', () => {
  let productId;

  test('Crear un nuevo producto', async () => {
    const response = await request(app)
      .post('/productos')
      .send({ nombre: 'Producto de prueba', precio: 10.99 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nombre', 'Producto de prueba');
    expect(response.body).toHaveProperty('precio', 10.99);

    productId = response.body.id;
  });

  test('Obtener todos los productos', async () => {
    const response = await request(app).get('/productos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Obtener un producto por ID', async () => {
    const response = await request(app).get(`/productos/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nombre', 'Producto de prueba');
    expect(response.body).toHaveProperty('precio', 10.99);
  });

  test('Actualizar un producto por ID', async () => {
    const response = await request(app)
      .put(`/productos/${productId}`)
      .send({ nombre: 'Producto actualizado', precio: 15.99 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', productId);
    expect(response.body).toHaveProperty('nombre', 'Producto actualizado');
    expect(response.body).toHaveProperty('precio', 15.99);
  });

  test('Eliminar un producto por ID', async () => {
    const response = await request(app).delete(`/productos/${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Producto eliminado correctamente');
  });
});
