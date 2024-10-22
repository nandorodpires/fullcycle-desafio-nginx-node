const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
}

const connection = mysql.createConnection(config)

// criando a tabela
const sqlCreate = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`
connection.query(sqlCreate, (err) => {
  if (err) console.log('Erro ao criar a tabela: ', err)
})

// inserindo uma pessoa 
const sqlInsert = `INSERT INTO people(name) VALUES ('Fernando Rodrigues')`
connection.query(sqlInsert, (err) => {
  if (err) console.log('Erro ao cadastrar a pessoa: ', err)
})


app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', (err, results) => {
    if (err) return res.status(500).send('Erro ao acessar o banco de dados');
    const namesList = results.map(person => `<li>${person.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
  });  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
