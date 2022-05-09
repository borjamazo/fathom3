const db = require("./db");

getJoke = async (jokeType = "", jokesListed = "") => {
  console.log("getting a joke");
  if (jokeType) {
    const joke = await db.query(
      `SELECT id, type, setup, punchline FROM jokes ${
        jokesListed
          ? "WHERE type='" + jokeType + "' AND id NOT IN (" + jokesListed + ")"
          : ""
      } ORDER BY RAND() LIMIT 1`
    );

    return { joke };
  } else {
    const joke = await db.query(
      `SELECT id, type, setup, punchline FROM jokes ${
        jokesListed ? "WHERE id NOT IN (" + jokesListed + ")" : ""
      } ORDER BY RAND() LIMIT 1`
    );

    return { joke };
  }
};

getJokesTypes = async () => {
  console.log("getting jokes types..");
  const jokesTypes = await db.query(`SELECT distinct(type) FROM jokes`);
  return { jokesTypes };
};

module.exports = {
  getJoke,
  getJokesTypes,
};
