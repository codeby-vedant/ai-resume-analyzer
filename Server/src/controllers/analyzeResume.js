const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const resume = require("../models/resume");
const express = require("express");
const { z } = require("zod");
const saveResponseToDb = require("./saveResponseToDb");
const AIrouter = express.Router();

const genAI = new GoogleGenAI({ key: process.env.GEMINI_API_KEY });
const sampleSchema = {
  type: "object",
  properties: {
    analysis: {
      type: "object",
      properties: {
        score: {
          type: "integer",
          minimum: 0,
          maximum: 100,
        },
        strengths: {
          type: "array",
          items: {
            type: "string",
          },
        },
        weaknesses: {
          type: "array",
          items: {
            type: "string",
          },
        },
        missingKeywords: {
          type: "array",
          items: {
            type: "string",
          },
        },
        suggestions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: [
        "score",
        "strengths",
        "weaknesses",
        "missingKeywords",
        "suggestions",
      ],
    },
  },
  required: ["analysis"],
};
const responseSchema = z.fromJSONSchema(sampleSchema);
AIrouter.post("/:resumeId/resume", async (req, res) => {
  try {
    const { resumeId } = req.params;
    const existingResume = await resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });
    if (!existingResume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    const resumeText = existingResume.text;

    const interaction = await genAI.interactions.create({
      model: "gemini-3.6-flash",
      input: `
You are an expert ATS resume analyzer.

Analyze the following resume for ATS compatibility and overall resume quality.

RESUME:
${resumeText}

Provide:
1. An overall ATS score from 1 to 100.
2. Key strengths of the resume.
3. Key weaknesses or areas that reduce its ATS effectiveness.
4. Important keywords that are missing or could be better represented.
5. Actionable suggestions for improving the resume.

Important rules:
- Base the analysis only on the information present in the resume.
- Do not invent skills, experience, projects, qualifications, or achievements.
- Evaluate factors such as relevant keywords, skills, formatting, clarity, section organization, readability, and how effectively the resume communicates the candidate's qualifications.
- Keep the feedback concise, specific, and actionable.
- Missing keywords should be relevant to the candidate's field and should not be randomly invented.
- Return the response strictly according to the provided JSON schema.
`,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: sampleSchema,
      },
    });

    const result = interaction.output_text;
    const response = responseSchema.parse(JSON.parse(result));
    ;
    const savedResume = await saveResponseToDb(response, resumeId);
    

    return res.json({
      content: response,
    });
  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ error: "Something went wrong" });
  }
});
module.exports = AIrouter;
