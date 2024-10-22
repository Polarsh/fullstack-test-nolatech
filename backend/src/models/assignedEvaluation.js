import { Schema, model } from "mongoose";

const assignedEvaluationSchema = new Schema({
  // Evaluador
  evaluatorId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  // Evaluado
  evaluateeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  // Evaluacion
  evaluationTemplateId: {
    type: Schema.Types.ObjectId,
    ref: "EvaluationTemplate",
    required: true,
  },
  responses: [
    {
      categoryName: { type: String, required: true },
      questions: [
        {
          question: { type: String, required: true },
          answer: {
            type: Number,
            min: 1,
            max: 5,
            default: null,
          },
        },
      ],
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

const AssignedEvaluation = model(
  "AssignedEvaluation",
  assignedEvaluationSchema
);

export default AssignedEvaluation;
