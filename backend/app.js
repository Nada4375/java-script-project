const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/student", require("./routes/student"));


require("dotenv").config();
const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exam");

app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);



module.exports = app;
