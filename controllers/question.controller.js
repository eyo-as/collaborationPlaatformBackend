// import the question service
const questionService = require("../services/question.service");

// a function to create a question in the database
async function createQuestion(req, res) {
  try {
    const { class_id, title, description, tags } = req.body;
    // Validate the required inputs
    if (!class_id || !title || !description) {
      return res
        .status(400)
        .json({ error: "Class ID, title, and description are required." });
    }
    const user_id = req.user?.user_id;
    if (!user_id) {
      return res.status(403).json({ error: "User ID is missing or invalid" });
    }
    // Pass the data to the service, including tags if provided
    const questionData = {
      user_id,
      class_id,
      title,
      description,
      tags: tags || null,
    }; // Default tags to null if not provided
    const question = await questionService.createQuestion(questionData);

    return res.status(201).json({
      message: "Question created successfully",
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// a function to get all questions from the database
async function getAllQuestions(req, res) {
  try {
    const questions = await questionService.getAllQuestions();
    return res.status(200).json({
      message: "Questions retrieved successfully",
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// a function to get a single question from the database
async function getQuestionById(req, res) {
  try {
    const question = await questionService.getQuestionById(
      req.params.question_id
    );
    // If the question is not found, return a 404 error
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    return res.status(200).json({
      message: "Question retrieved successfully",
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// a function to update a question in the database
async function updateQuestion(req, res) {
  try {
    const user_id = req.user?.user_id;

    const question = await questionService.updateQuestion(
      req.params.question_id,
      req.body,
      user_id
    );

    // if there is no changed rows
    if (question.changedRows === 0) {
      return res.status(400).json({
        message: "Question not changed",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Question updated successfully",
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// a function to delete a question from the database
async function deleteQuestion(req, res) {
  try {
    const question = await questionService.deleteQuestion(
      req.params.question_id
    );
    if (question.affectedRows === 0) {
      return res.status(404).json({
        message: "Question not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Question deleted successfully",
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// export the functions
module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
