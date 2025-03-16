import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  section: { type: String, required: true }, // To categorize FAQs (Java, DBMS, etc.)
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const FAQ = mongoose.model("FAQ", FAQSchema);
export default FAQ;
