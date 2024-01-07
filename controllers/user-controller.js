const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving Users: ${error}`);
  }
};

const getCurrentUser = async (req, res) => {
  res.json(req.user);
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

const registerUser = async (req, res) => {
  const { user_name, email, password, role } = req.body;

  if (!user_name || !email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const encrypted = bcrypt.hashSync(password);

  const newUser = {
    user_name,
    email,
    password: encrypted,
    role,
  };
  // insert to database
  try {
    await knex("user").insert(newUser);
    res.status(201).json({ message: `Registered new user` });
  } catch (error) {
    res.status(400).json({ message: `Registration failed`, error: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send(`Missing required fields`);
  }
  const user = await knex("user").where({ email }).first();

  if (!user) {
    return res.status(400).send(`User not found`);
  }

  //validate password
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send(`Invalid Password`);
  }

  //Generate JWT
  const token = jwt.sign(
    { email: user.email, id: user.id },
    process.env.JWT_SECRET
  );

  res.json({ token, id: user.id });
};

module.exports = {
  getUsers,
  getUsersById,
  registerUser,
  loginUser,
  getCurrentUser,
};
