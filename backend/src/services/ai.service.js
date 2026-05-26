const config = require("../config/config");

const Groq = require("groq-sdk");
const client = new Groq({ apiKey: config.GROQ_API_KEY });

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert interview coach. Return ONLY valid JSON with this exact structure, no extra text:
{
  "title": "job title string",
  "matchScore": number between 0-100,
  "technicalQuestions": [{ "question": "", "intention": "", "answer": "" }],
  "behavioralQuestions": [{ "question": "", "intention": "", "answer": "" }],
  "skillGaps": [{ "skill": "", "severity": "low|medium|high" }],
  "preparationPlan": [{ "day": 1, "focus": "", "tasks": [""] }],
  "title" : "",
}`,
        },
        {
          role: "user",
          content: `Generate an interview report.
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    // console.log("PARSED:", JSON.stringify(parsed, null, 2));
    return parsed;
  } catch (error) {
    console.log("AI ERROR:", error);
    throw error;
  }
}

module.exports = generateInterviewReport;
