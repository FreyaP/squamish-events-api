const bcrypt = require("bcryptjs");

module.exports = [
  {
    id: 1,
    user_name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("password"),
    role: "host",
  },
  {
    id: 2,
    user_name: "Squamish Hosts",
    email: "sh@example.com",
    password: bcrypt.hashSync("password"),
    role: "host",
  },
  {
    id: 3,
    user_name: "The Backyard",
    email: "backyard@example.com",
    password: bcrypt.hashSync("password"),
    role: "host",
  },
];
