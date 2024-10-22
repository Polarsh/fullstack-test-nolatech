import { Schema, model } from "mongoose";

const evaluationTemplateSchema = new Schema({
  createdBy: { type: String, required: true },
  title: { type: String, required: true },
  categories: [
    {
      name: { type: String, required: true },
      questions: [
        {
          question: { type: String, required: true },
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const EvaluationTemplate = model(
  "EvaluationTemplate",
  evaluationTemplateSchema
);

export default EvaluationTemplate;
