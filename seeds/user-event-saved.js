const usersData = require("../seed-data/users");
const eventsData = require("../seed-data/events");
const savedData = require("../seed-data/saved");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("event").del();
  await knex("saved").del();
  await knex("user").insert(usersData);
  await knex("event").insert(eventsData);
  await knex("saved").insert(savedData);
};
