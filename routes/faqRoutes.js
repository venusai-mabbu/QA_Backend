import express from "express";
import FAQ from "../models/FAQModel.js";

const router = express.Router();

// ✅ GET all FAQs for a specific section (e.g., /api/faqs/java)
router.get("/:section", async (req, res) => {
  try {
    const faqs = await FAQ.find({ section: req.params.section });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs" });
  }
});

// ✅ POST a new FAQ to a specific section
// router.post("/", async (req, res) => {
//   try {
//     const { section, question, answer } = req.body;
//     if (!section || !question || !answer) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newFAQ = new FAQ({ section, question, answer });
//     await newFAQ.save();
//     res.status(201).json(newFAQ);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding FAQ" });
//   }
// });
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Check if data is an array or a single object
    if (Array.isArray(data)) {
      // Validate all objects in the array
      for (const item of data) {
        if (!item.section || !item.question || !item.answer) {
          return res.status(400).json({ message: "All fields are required for each entry" });
        }
      }

      // Insert multiple records at once
      const insertedQuestions = await FAQ.insertMany(data);
      return res.status(201).json(insertedQuestions);
    } else {
      // Validate single object
      const { section, question, answer } = data;
      if (!section || !question || !answer) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Insert single record
      const newQuestion = new FAQ({ section, question, answer });
      await newQuestion.save();
      return res.status(201).json(newQuestion);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
