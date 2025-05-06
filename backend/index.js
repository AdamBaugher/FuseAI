require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const companyRoutes = require("./routes/companyRoutes");

app.use("/api/companies", companyRoutes);

// DB & Server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(5000, () => console.log("Server started on port 5000"));
    })
    .catch((err) => console.error(err));
