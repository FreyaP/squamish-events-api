const knex = require("knex")(require("../knexfile"));

const getUsers = async (req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving Users: ${error}`);
  }
};
const getUsersById = async (req, res) => {
  try {
    const user = await knex("user").where("id", req.params.id);
    if (user.length === 0) {
      return res.status(400).json({
        message: `Error retrieving user with ID: ${req.params.id}`,
      });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error accessing the database",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUsersById,
};
