const Exam = require("../models/Exam");
const Question = require("../models/Question");

exports.accessExamByLink = async (req, res) => {
    try {
        const exam = await Exam.findOne({ lien: req.params.link }).populate("questions");
        if (!exam) return res.status(404).json({ message: "Examen non trouvé" });
        res.json(exam);
    } catch (err) {
        res.status(500).json({ message: "Erreur accès examen", error: err.message });
    }
};


exports.submitExamAnswers = async (req, res) => {
    try {
        const { answers } = req.body;
        const { examId } = req.params;
        let score = 0;

        const exam = await Exam.findById(examId).populate("questions");
        if (!exam) return res.status(404).json({ message: "Examen non trouvé" });

        for (const a of answers) {
            const question = exam.questions.find(q => q._id.toString() === a.questionId);
            if (!question) continue;

            if (question.type === "directe") {
                const correct = question.reponse.trim().toLowerCase();
                const student = a.reponseEtudiant.trim().toLowerCase();
                const similarity = compareStrings(correct, student);
                if (similarity >= (1 - (question.tolerance || 0.1))) {
                    score += question.note;
                }
            }

            if (question.type === "qcm") {
                const goodOptions = question.options.filter(o => o.correct).map(o => o.text);
                const studentAnswers = a.reponseEtudiant;
                if (Array.isArray(studentAnswers) &&
                    goodOptions.every(opt => studentAnswers.includes(opt)) &&
                    studentAnswers.length === goodOptions.length) {
                    score += question.note;
                }
            }
        }

        const finalScore = (score / exam.questions.reduce((acc, q) => acc + q.note, 0)) * 100;
        res.json({ score: Math.round(finalScore) });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la soumission", error: err.message });
    }
};

function compareStrings(str1, str2) {
    const l1 = str1.length, l2 = str2.length;
    const minLen = Math.min(l1, l2);
    let correct = 0;
    for (let i = 0; i < minLen; i++) {
        if (str1[i] === str2[i]) correct++;
    }
    return correct / Math.max(l1, l2);
}

exports.saveGeolocation = async (req, res) => {
    try {
        const { userId, lat, lng } = req.body;
        console.log(`📍 Geoloc utilisateur ${userId} → (${lat}, ${lng})`);
        res.json({ message: "Coordonnées enregistrées" });
    } catch (err) {
        res.status(500).json({ message: "Erreur géolocalisation", error: err.message });
    }
};
