const router = require("express").Router();
const userController = require("../controllers/user-controller");
const authorize = require("../middleware/authorize");

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/current").get(authorize, userController.getCurrentUser);
router.route("/:id").get(userController.getUsersById);

module.exports = router;
