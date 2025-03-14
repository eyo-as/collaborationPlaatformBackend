// import service file
const answerService = require("../services/answer.service");
const questionService = require("../services/question.service");

// a function to create an answer
const createAnswer = async (req, res) => {
  try {
    const user_id = req.user?.user_id;
    const question_id = await questionService.getQuestionById(
      req.params.question_id
    );

    if (!user_id || !question_id.question_id) {
      return res
        .status(403)
        .json({ message: "User ID or question ID missing" });
    }
    // validate request body
    if (!req.body.answer_text) {
      return res.status(400).json({ message: "Answer is required" });
    }

    // pass the data to the service
    const answer = await answerService.createAnswer(
      req.body,
      user_id,
      question_id.question_id
    );
    return res.status(201).json({
      message: "Answer created successfully",
      success: true,
      data: answer,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// a function to get all answers
const getAllAnswers = async (req, res) => {
  try {
    const answers = await answerService.getAllAnswers();
    return res.status(200).json({
      message: "Answers retrieved successfully",
      success: true,
      data: answers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// a function to get a single answer
const getAnswerById = async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.answer_id);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    return res.status(200).json({
      message: "Answer retrived successfully!",
      data: answer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// a function to get answer by question id
const getAnswersByQuestionId = async (req, res) => {
  try {
    const question_id = req.params.question_id;
    const questionExist = await questionService.getQuestionById(question_id);

    if (!questionExist) {
      return res.status(404).json({
        message: "Question not found",
        success: false,
      });
    }
    const answers = await answerService.getAnswersByQuestionId(question_id);
    return res.status(200).json({
      message: "Answers retrieved successfully",
      success: true,
      data: answers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// a function to update an answer
const updateAnswer = async (req, res) => {
  try {
    const answer_id = req.params.answer_id;
    const answerExist = await answerService.getAnswerById(answer_id);

    if (!answerExist) {
      return res.status(404).json({
        message: "Answer not found",
        success: false,
      });
    }
    const answer = await answerService.updateAnswer(answer_id, req.body);

    if (!req.body.answer_text) {
      // validate request body
      return res.status(400).json({ message: "Answer is required" });
    }

    if (answer.changedRows === 0) {
      return res.status(400).json({
        message: "Answer not changed",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Answer updated successfully",
      success: true,
      data: answer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// a function to delete an answer
const deleteAnswer = async (req, res) => {
  try {
    const answer_id = req.params.answer_id;
    const answerExist = await answerService.getAnswerById(answer_id);

    if (!answerExist) {
      return res.status(404).json({
        message: "Answer already deleted or not found",
        success: false,
      });
    }
    const answer = await answerService.deleteAnswer(answer_id);
    return res.status(200).json({
      message: "Answer deleted successfully",
      success: true,
      data: answer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  getAnswersByQuestionId,
  updateAnswer,
  deleteAnswer,
};
