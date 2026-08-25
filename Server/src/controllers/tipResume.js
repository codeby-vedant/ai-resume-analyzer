const express = require("express");
const tipModel = require("../models/tip");
const { GoogleGenAI } = require("@google/genai");

const tipGenerator = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

tipGenerator.get("/tip", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    let tipDoc = await tipModel.findOne({
      date: today,
    });

    if (!tipDoc) {
      
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: "Give me one concise resume improvement tip of the day.",
      });

      const tipText = response.text;

      tipDoc = new tipModel({
        date: today,
        tip: tipText,
      });

      await tipDoc.save();
    }

    return res.status(200).json({
      msg: "Tip generated for today",
      tip: tipDoc.tip,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = tipGenerator;