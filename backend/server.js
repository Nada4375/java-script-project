const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log("✅ Backend démarré sur http://localhost:5000"));
    })
    .catch(err => console.error("❌ Erreur MongoDB", err));
