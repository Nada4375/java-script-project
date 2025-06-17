const Exam = require("../models/Exam");
const Question = require("../models/Question");
const { v4: uuidv4 } = require("uuid");

exports.createExam = async (req, res) => {
    try {
        const { titre, description, public } = req.body;
        const lien = uuidv4();

        const exam = await Exam.create({
            titre, description, public,
            lien,
            createur: req.user.id,
            questions: []
        });

        res.status(201).json({ message: "Examen créé", exam });
    } catch (err) {
        res.status(500).json({ message: "Erreur création examen", error: err.message });
    }
};

exports.addQuestionToExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const { type, enonce, duree, note, reponse, tolerance, options } = req.body;

        const question = await Question.create({
            type, enonce, duree, note, reponse, tolerance, options
        });

        await Exam.findByIdAndUpdate(examId, {
            $push: { questions: question._id }
        });

        res.status(201).json({ message: "Question ajoutée", question });
    } catch (err) {
        res.status(500).json({ message: "Erreur ajout question", error: err.message });
    }
};

exports.getExamDetails = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId).populate("questions");
        if (!exam) return res.status(404).json({ message: "Examen introuvable" });
        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération examen", error: err.message });
    }
};
