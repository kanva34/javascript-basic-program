//* Chatbot Script to get answer from Gemini 2.0 Flash model *//

//* Function to get chatbot answer
async function getChatbotAnswer() {
    //* Get input and output elements
  try {
    const inputref = document.getElementById("querry");
    const querry = inputref.value;
    const divref = document.getElementById("result");

    // Condition: Empty input
    if (!querry.trim()) {
      divref.innerText = "Please enter your query.";
      return;
    }
    divref.innerText = "Loading...";

    //* API call to Gemini 2.0 Flash model
    const res = await axios.post(
        //* API endpoint for Gemini 2.0 Flash model
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `please answer the user querry: ${querry} `,
              },
            ],
          },
        ],
      },
      {
        //* API key and content type in headers
        headers: {
          "X-goog-api-key": "AIzaSyCGivRd5jbEnQELbzIkjx1EfAWOYL-R5Ts",
          "Content-Type": "application/json",
        },
      }
    );

    //* Condition: No candidates or answer
    if (
      !res.data.candidates ||
      !res.data.candidates[0] ||
      !res.data.candidates[0].content ||
      !res.data.candidates[0].content.parts ||
      !res.data.candidates[0].content.parts[0].text
    ) {
      divref.innerText = "Sorry, no answer was found.";
      return;
    }

    divref.innerText = res.data.candidates[0].content.parts[0].text;
  } catch (error) {
    // Condition: API/network error
    divref.innerText = "Sorry, something went wrong. Please try again.";
    console.log(error);
  }
}
