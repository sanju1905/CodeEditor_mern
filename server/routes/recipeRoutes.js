const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
/**
 * App routes
 */
router.get("/", recipeController.homepage);
router.get("/quiz", recipeController.quiz);
router.post("/loginSubmit", recipeController.loginSubmit);
router.get("/login", recipeController.login);
router.get("/about", recipeController.about);
router.get("/quest", recipeController.quest);
router.get("/submit-ques", recipeController.submitForm);
router.post("/submit-ques", recipeController.submitQuestion);
router.get("/quiz-questions", recipeController.getQuizQuestions);
router.post("/submit-answer", recipeController.submitAnswers);

module.exports = router;
