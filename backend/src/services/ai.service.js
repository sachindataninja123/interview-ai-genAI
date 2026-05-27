const config = require("../config/config");
const puppeteer = require("puppeteer");

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

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "15mm",
      bottom: "20mm",
      left: "13mm",
      right: "13mm",
    },
  });

  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({
  resume,

  selfDescription,

  jobDescription,
}) {
  const prompt = `

Generate a professional ATS-friendly resume.

Resume:

${resume}

Self Description:

${selfDescription}

Job Description:

${jobDescription}

IMPORTANT:

Return ONLY valid JSON.
Format:
{
  "html": "<complete html document>"
}

The html should:

- Be complete HTML document
- Include inline CSS
- Be ATS friendly
- Be professional
- Fit in 1-2 pages

`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.7,
  });

  const content = response.choices[0].message.content;

  const cleaned = content

    .replace(/```json/g, "")

    .replace(/```/g, "")

    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.log("JSON Parse Error:", error);

    console.log("RAW RESPONSE:", content);

    throw new Error("Invalid JSON returned by AI");
  }
}

module.exports = { generateResumePdf, generateInterviewReport , generatePdfFromHtml};
