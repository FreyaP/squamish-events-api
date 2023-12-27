const router = require("express").Router();
const eventController = require("../controllers/event-controller");

router.route("/").get(eventController.getEvents);
router.route("/:id").get(eventController.getEventById);
router.route("/user/:id").get(eventController.getEventsByHostId);
module.exports = router;
