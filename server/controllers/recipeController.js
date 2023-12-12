const Ques = require("../models/Quiz");
const fs = require('fs').promises;
const path = require('path');
require("../models/database");
/**
 * Get /
 * HomePage
 */

exports.homepage = async (req, res) => {
  try {
    const quest = await Ques.find();

    const questsWithCodeContent = await Promise.all(
      quest.map(async (question) => {
        try {
          const codeFilePath = path.join(__dirname, '..', question.code);
          const codeContent = await fs.readFile(codeFilePath, 'utf-8');
          return { ...question.toObject(), codeContent };
        } catch (error) {
          console.error(`Error reading code file ${question.code}:`, error);
          return { ...question.toObject(), codeContent: 'Error loading code' };
        }
      })
    );

    res.render("index", { title: "Quiz-app", ques: questsWithCodeContent });
  } catch (error) {
    console.error("Error fetching questions:");
    res.status(500).send("Error Occurred");
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
    const { name, question } = req.body;

    if (req.files) {
      const codeFile = req.files.code;
      const videoFile = req.files.video;

      const codeFileName = `${Date.now()}_code${getFileExtension(codeFile.name)}`;
      const videoFileName = `${Date.now()}_video.mp4`;

      const codePath = `./code/${codeFileName}`;
      codeFile.mv(codePath);

      const videoPath = `./video/${videoFileName}`;
      videoFile.mv(videoPath);

      const newQuestion = new Ques({
        name,
        question,
        video: videoPath,
        code: codePath
      });

      await newQuestion.save();

      res.redirect('/submit-ques');
    } else {
      res.status(400).send('No files were uploaded.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

function getFileExtension(filename) {
  const dotIndex = filename.lastIndexOf('.');
  return dotIndex === -1 ? '' : filename.slice(dotIndex + 1);
}




