const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    titre: String,
    description: String,
    public: String,
    lien: String,
    createur: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

module.exports = mongoose.model("Exam", examSchema);
