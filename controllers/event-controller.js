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
        message: `You have not posted any events`,
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

const postEvent = async (req, res) => {
  const {
    event_name,
    category,
    date,
    description,
    ticket_link,
    venue,
    user_id,
  } = req.body;

  const imageName = req.file.filename;

  // Check if values exist
  if (!event_name || !category || !date || !description || !venue || !user_id) {
    return res.status(400).json({ message: "Fill in missing fields" });
  }
  try {
    // Check that user/host exists
    const userExists = await knex("user").where({ id: user_id }).first();
    if (!userExists) {
      return res.status(400).json({
        message: "User ID not found, cannot post event to this user/host",
      });
    }
    // Insert new event into database
    const [newEventId] = await knex("event").insert({
      event_name,
      venue,
      description,
      date,
      category,
      ticket_link,
      user_id,
      image: imageName,
    });

    const newEvent = await knex("event").where({ id: newEventId }).first();
    res.status(200).json(newEvent);
  } catch (error) {
    console.log(error);
  }
};

const updateEventById = async (req, res) => {
  const {
    event_name,
    category,
    date,
    description,
    ticket_link,
    venue,
    user_id,
  } = req.body;

  let imageName;
  if (req.file) {
    imageName = req.file.filename;
  } else if (!req.file) {
    imageName = req.body.image;
  }

  if (
    !category ||
    !date ||
    !description ||
    !event_name ||
    !ticket_link ||
    !user_id ||
    !venue
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const rowsUpdated = await knex("event")
      .where({ id: req.params.id })
      .update({
        event_name,
        venue,
        description,
        date,
        category,
        ticket_link,
        user_id,
        image: imageName,
      });

    // Checking that event exists and was updated
    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Event with ID: ${req.params.id} not found` });
    }
    // getting updated event
    const updatedEvent = await knex("event").where("id", req.params.id);

    res.status(200).json(updatedEvent[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update event with ID: ${req.params.id}. ${error}`,
    });
  }
};

const deleteEventById = async (req, res) => {
  try {
    const foundEvent = await knex("event").where("id", req.params.id).first();
    if (!foundEvent) {
      return res.status(404).json({ message: `Event not found` });
    }
    await knex("event").where("id", req.params.id).del();
    res.status(204).send(`Deleted Event`);
  } catch (error) {
    res.status(500).json({ message: `Error accessing database`, error: error });
  }
};
module.exports = {
  getEvents,
  getEventById,
  getEventsByHostId,
  postEvent,
  updateEventById,
  deleteEventById,
};
