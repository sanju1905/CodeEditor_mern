const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
/**
 * App routes
 */
router.get("/", recipeController.homepage);
router.get("/quiz", recipeController.quiz);

router.get("/quest", recipeController.quest);
router.get("/submit-ques", recipeController.submitForm);
router.post("/submit-ques", recipeController.submitQuestion);



module.exports = router;
