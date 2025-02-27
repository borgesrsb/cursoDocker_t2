const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "fullcycle"
});

// Conecta ao banco de dados
db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL.");
  }
});

// Criar tabela caso não exista
const createTable = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`;
db.query(createTable);

// Rota principal
app.get("/", (req, res) => {
  const name = `User_${Math.floor(Math.random() * 1000)}`;

  // Inserir um nome aleatório no banco
  db.query(`INSERT INTO people (name) VALUES ('${name}')`, () => {
    db.query("SELECT * FROM people", (err, results) => {
      if (err) {
        res.send("Erro ao buscar nomes.");
      } else {
        const namesList = results.map(person => `<li>${person.name}</li>`).join("");
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
      }
    });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
