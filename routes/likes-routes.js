const router = require("express").Router();
const likesController = require("../controllers/likes-controller");

router
  .route("/")
  .post(likesController.likeEvent)
  .delete(likesController.deleteFromSavedEvents);

router.route("/:user_id").get(likesController.getSavedEvents);

module.exports = router;
