const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY

});


async function callGemini(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        return response.text;

    } catch (error) {
        console.log("FULL ERROR:", error);
        console.log("CAUSE:", error.cause);
        throw error;

    }
}

module.exports = callGemini;