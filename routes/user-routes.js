const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/").get(userController.getUsers);
router.route("/:id").get(userController.getUsersById);

module.exports = router;
