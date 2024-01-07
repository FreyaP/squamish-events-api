const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));

async function authorize(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("no auth");
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex("user").where({ id: payload.id }).first();
    const { password, ...userSansPW } = user;
    req.user = userSansPW;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `${error}` });
  }
}
module.exports = authorize;
