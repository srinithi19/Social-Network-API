const router = require("express").Router();

const {
    getSingleUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    deleteFriend,
    addFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);
router.route("/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);
module.exports = router;