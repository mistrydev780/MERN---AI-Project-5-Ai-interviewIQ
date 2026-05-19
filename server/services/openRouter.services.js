import axios from "axios";

export const askAi = async (messages) => {

  try {

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        // ✅ FIXED MODEL
        model: "openai/gpt-4o-mini",

        messages,
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",

          // Recommended
          "HTTP-Referer": "http://localhost:5173",

          "X-Title": "InterviewIQ",
        },
      }
    );

    return response
      .data
      .choices[0]
      .message
      .content;

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message
    );

    throw error;
  }
};