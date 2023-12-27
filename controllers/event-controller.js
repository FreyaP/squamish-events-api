const knex = require("knex")(require("../knexfile"));

const getEvents = async (req, res) => {
  try {
    const events = await knex("event");
    res.status(200).json(events);
  } catch (error) {
    res.status(404).send(`Error retrieving events: ${error}`);
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await knex("event").where("id", req.params.id);

    if (event.length === 0) {
      return res.status(400).json({
        message: `Error retrieving event with ID: ${req.params.id}`,
      });
    }
    res.status(200).json(event[0]);
  } catch (error) {
    res.status(500).json({
      message: `Error accessing the database`,
      error: error.message,
    });
  }
};

const getEventsByHostId = async (req, res) => {
  try {
    const eventsByHost = await knex("event").where("user_id", req.params.id);

    if (eventsByHost.length === 0) {
      return res.status(400).json({
        message: `No events found connected to the user ID: ${req.params.id}`,
      });
    }
    res.status(200).json(eventsByHost);
  } catch (error) {
    res.status(500).json({
      message: `Error accessing the database`,
      error: error.message,
    });
  }
};

module.exports = {
  getEvents,
  getEventById,
  getEventsByHostId,
};
