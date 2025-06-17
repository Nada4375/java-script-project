const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    password: String,
    dateNaissance: Date,
    sexe: String,
    etablissement: String,
    filiere: String,
    role: { type: String, enum: ["professeur", "etudiant"] }
});
module.exports = mongoose.model("User", userSchema);
