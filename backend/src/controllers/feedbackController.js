import EvaluationTemplate from "../models/evaluationTemplateModel.js";

export const addFeedbackToEvaluationTemplate = async (req, res) => {
  const { templateId, comment } = req.body;
  const employeeId = req.user.employeeId;

  try {
    const template = await EvaluationTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({
        error: { message: "Plantilla de evaluación no encontrada." },
        data: null,
      });
    }

    const feedback = {
      employeeId,
      comment,
      submittedAt: Date.now(),
    };
    template.feedback.push(feedback);

    await template.save();

    res.status(201).json({
      error: null,
      data: {
        message: "Feedback enviado correctamente sobre la plantilla.",
        feedback,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error al enviar el feedback.",
        details: error.message,
      },
      data: null,
    });
  }
};
