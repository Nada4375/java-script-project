const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createExam,
    addQuestionToExam,
    getExamDetails
} = require("../controllers/examController");

router.post("/create", protect, createExam);
router.post("/:examId/question", protect, addQuestionToExam);
router.get("/:examId", getExamDetails);

module.exports = router;
