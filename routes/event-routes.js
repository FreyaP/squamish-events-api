const router = require("express").Router();
const eventController = require("../controllers/event-controller");
const upload = require("../middleware/upload");

router
  .route("/")
  .get(eventController.getEvents)
  .post(upload.single("image"), eventController.postEvent);
router
  .route("/:id")
  .get(eventController.getEventById)
  .put(upload.single("image"), eventController.updateEventById);
router.route("/user/:id").get(eventController.getEventsByHostId);

module.exports = router;
