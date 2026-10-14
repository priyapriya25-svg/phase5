const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const callGemini = require("./services/geminiService");

const app = express();

app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});


app.post("/ask", async (req, res) => {
    const question = req.body.question;

    if (!question) {
        return res.status(400).json({
            error: "Question is required"
        });
    }

    try {
        const answer = await callGemini(question);

        res.json({
            answer: answer
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Something went wrong while contacting Gemini"
        });
    }
});


app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
