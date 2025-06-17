const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    type: { type: String, enum: ["directe", "qcm"] },
    enonce: String,
    duree: Number,
    note: Number,
    reponse: String,
    tolerance: Number,
    options: [{ text: String, correct: Boolean }]
});

module.exports = mongoose.model("Question", questionSchema);
