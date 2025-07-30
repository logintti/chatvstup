const fetch = require("node-fetch");

exports.handler = async function(event) {
  const body = JSON.parse(event.body || "{}");
  const userMessage = body.message || "";

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Ти помічник сайту. Відповідай коротко і українською." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Помилка з боку сервера." })
    };
  }
};
