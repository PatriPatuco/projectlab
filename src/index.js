// importacion de modulos
const mysqlPromise = require("mysql2/promise");
const cors = require("cors");
const express = require("express");

// configurar servidor
const app = express();
app.use(cors());

// limite de tamano de archivos
app.use(express.json({ limit: "150mb" }));
app.set("view engine", "ejs");

// Configurar la conexión a la base de datos en el modo de promesas
const connection = mysqlPromise.createPool({
  host: "sql.freedb.tech",
  database: "freedb_projectlab",
  user: "freedb_adminlab",
  password: "&&bS92BY4#s3W6%",
});

// Definir la función getConnection para usar la conexión establecida
async function getConnection() {
  try {
    const configConnection = await connection.getConnection();
    console.log(
      `Conexión establecida con la base de datos (identificador=${configConnection.threadId})`
    );
    return configConnection;
  } catch (err) {
    console.error("Error de conexión: " + err.stack);
    throw err;
  }
}

app.get("/projects/all", async (req, res) => {
  try {
    console.log("Pidiendo a la base de datos información de los users.");
    const sql =
      "SELECT projects.idprojects,projects.name,projects.desc,projects.slogan,projects.repo,projects.demo,projects.technologies,autors.autor,autors.job,autors.photo FROM projects JOIN autors ON autors.idautors = projects.fkAutor";

    const connection = await getConnection(); // Obtener la conexión
    const [results, fields] = await connection.query(sql); // Realizar la consulta con el método promise().query()
    res.json(results);
    connection.end(); // Cerrar la conexión después de obtener los resultados
  } catch (err) {
    throw err;
  }
});

app.post("/projects/add", async (req, res) => {
  const data = req.body;
  console.log("Esto es", data);

  if (data.name === "") {
    return res.status(400).json({
      success: false,
      error: "El campo nombre debe estar completo",
    });
  }

  if (data.slogan === "") {
    return res.status(400).json({
      success: false,
      error: "El campo slogan debe estar completo",
    });
  }

  if (data.demo === "") {
    return res.status(400).json({
      success: false,
      error: "Completa el campo con la url de tu demo",
    });
  }

  if (data.repo === "") {
    return res.status(400).json({
      success: false,
      error: "Completa el campo con la url de tu repo",
    });
  }

  if (data.technologies === "") {
    return res.status(400).json({
      success: false,
      error: "Completa las tecnologías del proyecto",
    });
  }

  if (data.desc === "") {
    return res.status(400).json({
      success: false,
      error: "Añade una descripción del proyecto",
    });
  }

  if (data.image === "") {
    return res.status(400).json({
      success: false,
      error: "Añade una imagen del proyecto",
    });
  }

  if (data.photo === "") {
    return res.status(400).json({
      success: false,
      error: "Añade una foto del autor",
    });
  }

  if (data.autor === "") {
    return res.status(400).json({
      success: false,
      error: "Completa el nombre del autor",
    });
  }

  if (data.job === "") {
    return res.status(400).json({
      success: false,
      error: "Indica el trabajo del autor",
    });
    
  } else {
    let sqlAutor = "INSERT INTO autors (autor, job, photo) VALUES (?, ?, ?)";
    let valuesAutor = [data.autor, data.job, data.photo];

    const connection = await getConnection();
    const [results, fields] = await connection.query(sqlAutor, valuesAutor);

    let sqlProject =
      "INSERT INTO projects (name, `desc`, slogan, repo, demo, technologies, image, fkAutor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let valuesProject = [
      data.name,
      data.desc,
      data.slogan,
      data.repo,
      data.demo,
      data.technologies,
      data.image,
      results.insertId,
    ];
    console.log(results);

    const addResults = await connection.query(sqlProject, valuesProject);
    let response = {
      success: true,
      cardURL: `http://localhost:4000/projects/${results.insertId}`,
    };
    res.json(response);
  }
});

// Endpoint details

app.get("/projects/:projectID", async (req, res) => {
  let connection; // Definimos la variable de conexión en el ámbito de esta ruta
  try {
    const projectId = req.params.projectID;
    const sql =
      "SELECT * FROM projects, autors WHERE projects.fkAutor=autors.idautors AND idprojects=?";

    // Aquí utilizamos await para esperar que se resuelva la promesa antes de continuar con la ejecución.
    connection = await getConnection();
    const [results, fields] = await connection.query(sql, [projectId]);

    // Renderizamos la plantilla EJS 'project_detail' y pasamos el primer resultado (results[0]) como datos del proyecto.
    res.render("project_detail", results[0]);
  } catch (err) {
    // Manejo de errores si ocurre algún problema en la consulta a la base de datos u otras operaciones asíncronas.
    console.error(err);
    res.status(500).send("Error interno del servidor");
  } finally {
    // Aseguramos que la conexión se cierre después de usarla para evitar fugas de memoria
    if (connection) {
      connection.release();
    }
  }
});

//Servidor de estáticos

app.use(express.static("./src/public-react"));
app.use(express.static("./src/public-css"));
app.use(express.static("./src/public-images"));

app.get("*", (req, res) => {
  res.send("Error 404");
});

// escuchar el servidor
const serverPort = process.env.PORT || 4000;
app.listen(serverPort, () => {
  console.log(`Example app listening on port ${serverPort}`);
});
