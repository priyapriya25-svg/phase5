const question = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const answer = document.getElementById("answer");

askBtn.addEventListener("click", async () => {
    const userQuestion = question.value.trim();

    
    if (!userQuestion) {
        answer.textContent = "Please enter a question.";
        return;
    }

    
    askBtn.disabled = true;
    askBtn.textContent = "Loading...";
    answer.textContent = "Thinking...";

    try {
    
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: userQuestion
            })
        });

        
        const data = await response.json();

    
        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        console.log("Response:", data);

        
        answer.textContent = data.answer;

    } catch (error) {
        console.log("Error:", error);

        answer.textContent = "Something went wrong. Please try again.";
    }


    askBtn.disabled = false;
    askBtn.textContent = "Ask Gemini";
});