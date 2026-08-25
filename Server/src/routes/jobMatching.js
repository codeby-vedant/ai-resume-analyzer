const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const matcher = express.Router();
const Resume = require("../models/resume");
const genAI = new GoogleGenAI({ key: process.env.GEMINI_API_KEY });
const {upload} = require("../utils/upload");
const textExtracter = require("../utils/pdfParse");
const matcherSchema = {
  type: "object",
  properties: {
    alignmentScore: {
      type: "integer",
      minimum: 1,
      maximum: 100,
      description:
        "Overall alignment score between the resume and job description.",
    },

    summary: {
      type: "string",
      description:
        "A short explanation of how well the resume matches the job description.",
    },

    matchedSkills: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Skills and technologies present in both the resume and job description.",
    },

    missingSkills: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Important skills or technologies required by the job description that are missing from the resume.",
    },

    missingKeywords: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Important keywords or phrases from the job description that are missing from the resume.",
    },

    suggestions: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Actionable suggestions to improve the resume for this particular job.",
    },
  },

  required: [
    "alignmentScore",
    "summary",
    "matchedSkills",
    "missingSkills",
    "missingKeywords",
    "suggestions",
  ],
};
const responseSchema = z.fromJSONSchema(matcherSchema);
matcher.post("/match", upload.single("matcherResume"), async (req, res) => {
  try {
    const description = req.body.description;
    const filebuffer = req.file.buffer;
    // console.log(filebuffer.length+"1");//debug
    if (!description) {
      return res
        .status(404)
        .json({ error: "No description is found to comapare" });
    }
    const textToMatch = await textExtracter(filebuffer);
    // console.log(textToMatch+"2");//debug
    const interaction = await genAI.interactions.create({
      model: "gemini-3.6-flash",
      input: `
You are an expert resume and job-matching assistant.

Analyze the candidate's resume against the provided job description.

RESUME:
${textToMatch}

JOB DESCRIPTION:
${description}

Evaluate how well the resume matches the specific job description.

Provide:
1. An overall alignment score from 1 to 100.
2. A short summary explaining the level of alignment.
3. Skills and technologies that are present in both the resume and job description.
4. Important skills or technologies required by the job description but missing from the resume.
5. Important keywords or phrases from the job description that are missing from the resume.
6. Actionable suggestions to improve the resume specifically for this job.

Important rules:
- Base your analysis only on the information present in the resume and job description.
- Do not assume that the candidate has a skill or experience that is not mentioned in the resume.
- Do not invent qualifications, experience, projects, or technologies.
- Give a lower score when important requirements of the job are missing from the resume.
- Consider skills, technologies, experience, education, and relevant keywords when calculating the alignment score.
- Keep the suggestions concise and practical.
- Return the response strictly according to the provided JSON schema.
`,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: matcherSchema,
      },
    });
    const result = interaction.output_text;
    const response = responseSchema.parse(JSON.parse(result));
    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err); //debug
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = matcher;
