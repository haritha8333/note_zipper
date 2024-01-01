const express = require("express");
const { getNotes, createNote,getNoteById, UpdateNote, DeleteNote  } = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");
 
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect,createNote);
router.route("/:id").get(getNoteById).put(protect,UpdateNote).delete(protect,DeleteNote);


// the above router is to get all of the notes
// router.route('/create').post()
// the above is to create a note and the request type is post bcoz we are gonna post our note to backend
// router.route('/:id')
//     .get()
//     // 1st we have get the note
//     .put()
// // to update the note
//     .delete()

module.exports = router;
 