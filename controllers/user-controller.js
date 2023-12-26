//const knex = require("knex")(require("../knexfile"));

const getUsers = (req, res) => {
  res.status(200).send(`getting users!`);
};

module.exports = {
  getUsers,
};
