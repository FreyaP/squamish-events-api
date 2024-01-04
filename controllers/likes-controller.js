const knex = require("knex")(require("../knexfile"));

const likeEvent = async (req, res) => {
  const { user_id, event_id } = req.body;

  //check fields exist
  if (!user_id || !event_id) {
    res.status(400).send(`No user and/or event supplied`);
  }
  //create new record
  const newRecord = {
    user_id,
    event_id,
  };
  //check if record already exists
  const [recordExists] = await knex("saved").where({
    user_id: user_id,
    event_id: event_id,
  });

  if (recordExists) {
    return res.status(409).json({ message: `You already saved this event` });
    // do you want to remove from saved events?
  }
  //insert to saved table
  try {
    await knex("saved").insert(newRecord);
    res.status(201).json({ message: `Saved event like` });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Saving event to user failed`, error: error });
  }
};

const getSavedEvents = async (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
    return res.status(400).send(`No user supplied`);
  }

  try {
    const savedEvents = await knex("saved").where("user_id", user_id);

    res.status(200).json(savedEvents);
  } catch (error) {
    res
      .status(400)
      .json({ message: `Could not find saved events`, error: error });
  }
};

const deleteFromSavedEvents = async (req, res) => {
  const { event_id, user_id } = req.params;
  if (!user_id || !event_id) {
    return res.status(400).send(`No user and/or event supplied`);
  }
  try {
    await knex("saved")
      .where({
        user_id: user_id,
        event_id: event_id,
      })
      .del();
    res.status(204).send(`Removed from saved events`);
  } catch (error) {
    res.status(400).send(`Could not delete record`);
  }
};

module.exports = {
  likeEvent,
  getSavedEvents,
  deleteFromSavedEvents,
};
