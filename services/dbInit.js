const mysql = require("mysql2/promise");
const config = require("../config");
const jokesData = require("../data/data-jokes.json");

init = async () => {
  const connection = await mysql.createConnection(config.db);
  await connection.query("CREATE DATABASE IF NOT EXISTS jokes");
  console.log("Database Jokes Done");
  await connection.query("USE jokes");
  await connection.query(
    "CREATE TABLE IF NOT EXISTS jokes (id INTEGER, type VARCHAR(20),setup VARCHAR(255), punchline VARCHAR(255))"
  );
  console.log("Table Jokes Done");

  await Promise.all(
    jokesData.map(async (joke, index) => {
      const contents = await connection.query(
        `INSERT INTO jokes (id,type,setup,punchline) VALUES (${joke.id}, 
      ${JSON.stringify(joke.type)}, 
      ${JSON.stringify(joke.setup)}, 
      ${JSON.stringify(joke.punchline)})`
      );
      console.log(`joke ${index} inserted`);
    })
  ).then(() => {
    connection.close();
    console.log("Import process completed");
  });
};

init();
