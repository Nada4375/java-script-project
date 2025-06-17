const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    accessExamByLink,
    submitExamAnswers,
    saveGeolocation
} = require("../controllers/studentController");

router.get("/access/:link", protect, accessExamByLink);
router.post("/submit/:examId", protect, submitExamAnswers);
router.post("/geolocation", protect, saveGeolocation);

module.exports = router;
