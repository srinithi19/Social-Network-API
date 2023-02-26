const router = require("express").Router();

const {
    getSingleThought,
    getThoughts,
    createThought,
    deleteThought,
    updateThought,
    deleteReaction,
    createReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router.route("/:id").get(getSingleThought).delete(deleteThought).put(updateThought);
router.route("/:id/reactions").post(createReaction);
router.route("/:id/reactions/:reactionId").delete(deleteReaction);
module.exports = router;