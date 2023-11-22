const mysql = require("mysql2");

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "productosTest"

})

db.connect((err) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });

module.exports= db;