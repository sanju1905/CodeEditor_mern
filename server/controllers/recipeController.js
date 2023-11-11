require("../models/database");
const Quiz = require("../models/Quiz");
const xlsx = require('xlsx');

/**
 * Get /
 * HomePage
 */

exports.homepage = async (req, res) => {
  try {
    res.render("index", { title: "Quiz-app" });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Ocurred");
  }
};

/**
 *Quiz
 */
exports.quiz = async (req, res) => {
  try {
    res.render("quiz", { title: "Play Quiz" });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Ocurred");
  }
};

/**
 *About
 */
exports.about = async (req, res) => {
  try {
    res.render("about", { title: "About us" });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Ocurred");
  }
};

/**
 *Quest
 */
exports.quest = async (req, res) => {
  try {
    res.render("quest", { title: "Play Quiz" });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Ocurred");
  }
};

/**
 *Submit Form
 */
exports.submitForm = async (req, res) => {
  try {
    res.render("submit-ques", { title: "Questions-Form" });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Ocurred");
  }
};

/**
 *Submit Question post
 */

 exports.submitQuestion = async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, answer, title } = req.body;

    // Check if a file was uploaded
    if (req.files && req.files.file) {
      const file = req.files.file;

      // Read the file data
      const workbook = xlsx.read(file.data, { type: 'buffer' });

      // Assuming there is only one sheet in the Excel file
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Extract data from the sheet
      const excelData = xlsx.utils.sheet_to_json(sheet);

      // Insert each row from the Excel file into the database
      for (const row of excelData) {
        const newQuestion = new Quiz({
          question: row.question,
          option1: row.option1,
          option2: row.option2,
          option3: row.option3,
          option4: row.option4,
          answer: row.answer,
          title: row.title,
        });

        await newQuestion.save();
      }

      res.redirect("/submit-ques");
    } else {
      // Handle form data without file upload
      const newQuestion = new Quiz({
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
        title,
      });

      await newQuestion.save();
      res.redirect("/submit-ques");
    }
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Occurred");
  }
};
/**
 * Get Quiz Questions
 */
exports.getQuizQuestions = async (req, res) => {
  try {
    // Get the difficulty level selected by the user
    const difficulty = req.query.difficulty;

    // Set the number of questions based on difficulty
    let numberOfQuestions;
    if (difficulty === "easy") {
      numberOfQuestions = 1;
    } else if (difficulty === "medium") {
      numberOfQuestions = 2;
    } else if (difficulty === "hard") {
      numberOfQuestions = 3;
    } else {
      // Default to easy if difficulty is not recognized
      numberOfQuestions = 1;
    }

    // Use Mongoose to fetch a random subset of quiz questions from the database
    const quizQuestions = await Quiz.aggregate([
      { $sample: { size: numberOfQuestions } },
    ]);

    // Render the 'quiz-questions' view and pass the quiz questions and difficulty as data
    res.render("quiz-questions", {
      title: "Quiz Questions",
      quizQuestions,
      difficulty,
    });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Occurred");
  }
};

/**
 *Submit Answers
 */
exports.submitAnswers = async (req, res) => {
  try {
    const submittedAnswers = req.body;
    const quizQuestions = await Quiz.find();

    let points = 0;
    let total = 0;

    quizQuestions.forEach((question) => {
      const submittedAnswer = submittedAnswers[`answer${question._id}`];

      if (question.answer && submittedAnswer !== undefined) {
        const correctAnswer = question.answer.trim().toLowerCase();
        const submittedAnswerTrimmed = submittedAnswer.trim().toLowerCase();

        console.log(
          `Question ${question._id} - Correct: ${correctAnswer}, Submitted: ${submittedAnswerTrimmed}`
        );

        if (correctAnswer === submittedAnswerTrimmed) {
          points++;
        }
        total++;
      }
    });

    console.log(`Total Points: ${points}, Total Questions: ${total}`);

    res.render("score", { title: "Quiz Result", points, total });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Occurred");
  }
};
/**
 *Login Form
 */
 exports.login = async (req, res) => {
  try {
    res.render("login", { title: "Admin-Form" });
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Ocurred");
  }
};
/**
 *Login submit
 */
 exports.loginSubmit = async (req, res) => {
  try {
    name=req.body.name;
    password=req.body.password;
    if (name === "Sanjay" && password === "1905") {
      res.render("submit-ques", { title: "Ques_upload" });
    }
    else{
      
      res.render("login", { title: "Admin-Form" });
    }
    
  } catch (error) {
    res.status(500).send({ message: error.message } || "Error Ocurred");
  }
};