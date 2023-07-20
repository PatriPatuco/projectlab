// importacion de modulos
const mysqlPromise = require('mysql2/promise');
const cors = require('cors');
const express = require('express');

// configurar servidor
const app = express();
app.use(cors());

// limite de tamano de archivos
app.use(express.json({ limit: "150mb" }));
app.set("view engine", "ejs");

// Configurar la conexión a la base de datos en el modo de promesas
const connection = mysqlPromise.createPool({
  host: 'sql.freedb.tech',
  database: 'freedb_projectlab',
  user: 'freedb_adminlab',
  password: '&&bS92BY4#s3W6%',
});

// Definir la función getConnection para usar la conexión establecida
async function getConnection() {
  try {
    const configConnection = await connection.getConnection();
    console.log(`Conexión establecida con la base de datos (identificador=${configConnection.threadId})`);
    return configConnection;
  } catch (err) {
    console.error('Error de conexión: ' + err.stack);
    throw err;
  }
}

// ...

app.get('/projects/:projectID', async (req, res) => {
  let connection; // Definimos la variable de conexión en el ámbito de esta ruta
  try {
    const projectId = req.params.projectID;
    const sql = "SELECT * FROM projects, autors WHERE projects.fkAutor=autors.idautors AND idprojects=?";

    // Aquí utilizamos await para esperar que se resuelva la promesa antes de continuar con la ejecución.
    connection = await getConnection();
    const [results, fields] = await connection.query(sql, [projectId]);

    // Renderizamos la plantilla EJS 'project_detail' y pasamos el primer resultado (results[0]) como datos del proyecto.
    res.render('project_detail', results[0]);
  } catch (err) {
    // Manejo de errores si ocurre algún problema en la consulta a la base de datos u otras operaciones asíncronas.
    console.error(err);
    res.status(500).send('Error interno del servidor');
  } finally {
    // Aseguramos que la conexión se cierre después de usarla para evitar fugas de memoria
    if (connection) {
      connection.release();
    }
  }
});

// ...

// escuchar el servidor
const serverPort = process.env.PORT || 4000;
app.listen(serverPort, () => {
    console.log(`Example app listening on port ${serverPort}`);
});
