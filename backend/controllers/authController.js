const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, password, dateNaissance, sexe, etablissement, filiere, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            nom, prenom, email, password: hashed, dateNaissance, sexe, etablissement, filiere, role
        });

        res.status(201).json({ message: "Utilisateur inscrit avec succès", user });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: "Erreur de connexion", error: err.message });
    }
};
