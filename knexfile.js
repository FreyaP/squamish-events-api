require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// ***ADD YOUR OWN .ENV FILE TO MATCH THE SAMPLE ENV WITH YOUR OWN CREDENTIALS. NOTE _LOCAL_ FOR EACH VARIABLE
module.exports = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    database: "squamish_events",
    user: "root",
    password: "rootroot",
    charset: "utf8",
  },
};
