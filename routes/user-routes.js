const router = require("express").Router();
const userController = require("../controllers/user-controller");

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/:id").get(userController.getUsersById);

module.exports = router;
