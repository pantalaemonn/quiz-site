const quizData = [
  {
    key: "q1",
    answer: "a",
    dialogue: {
      correct: "Nice job! HTML is the backbone of web pages.",
      incorrect: "Oops! HTML stands for Hyper Text Markup Language.",
    },
  },
  {
    key: "q2",
    answer: "c",
    dialogue: {
      correct: "Exactly! CSS styles the web.",
      incorrect: "Not quite. CSS is used for styling web pages.",
    },
  },
  {
    key: "q3",
    answer: "b",
    dialogue: {
      correct: "Correct! JS is short for JavaScript.",
      incorrect: "Wrong. JS stands for JavaScript.",
    },
  },
  {
    key: "q4",
    answer: "b",
    dialogue: {
      correct: "Yep! <style> is used for internal styles.",
      incorrect: "Incorrect. The correct tag is <style>.",
    },
  },
  {
    key: "q5",
    answer: "c",
    dialogue: {
      correct: "Right! JavaScript doesn't have a Float type.",
      incorrect: "Nope. Float isn't a JavaScript data type.",
    },
  },
  {
    key: "q6",
    answer: "a",
    dialogue: {
      correct: "Well done! DOM means Document Object Model.",
      incorrect: "Wrong. DOM stands for Document Object Model.",
    },
  },
];

const welcomeSection = document.getElementById("welcomeSection");
const quizContainer = document.querySelector(".quiz-container");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  welcomeSection.style.display = "none";
  quizContainer.style.display = "block";
  questions[currentQuestion].classList.add("active");
  handleAnswerSelection(); // Next button disable logic
});

const questions = document.querySelectorAll(".question");
const progressFill = document.getElementById("progressFill");
const imageElement = document.getElementById("quizImage");
const dialogueBox = document.getElementById("dialogueBox");
let currentQuestion = 0;
let imageIndex = 3;

const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

// Disable Next button initially
function handleAnswerSelection() {
  const currentItem = quizData[currentQuestion];
  const options = document.querySelectorAll(`input[name="${currentItem.key}"]`);
  const nextBtn = document.getElementById("nextBtn");

  options.forEach((option) => {
    option.addEventListener("change", () => {
      nextBtn.disabled = false;
    });
  });

  // Disable the button again when moving to a new question
  nextBtn.disabled = true;
}

function updateProgress() {
  const percent = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = `${percent}%`;
}

function showDialogue(text) {
  dialogueBox.innerHTML = "";
  const feedback = document.createElement("p");
  feedback.classList.add("fade");
  feedback.textContent = text;
  dialogueBox.appendChild(feedback);
}

updateProgress();

nextBtn.addEventListener("click", () => {
  const currentItem = quizData[currentQuestion];
  const selected = document.querySelector(
    `input[name="${currentItem.key}"]:checked`
  );

  if (selected) {
    if (selected.value === currentItem.answer) {
      imageIndex = Math.max(1, imageIndex - 1);
      showDialogue(currentItem.dialogue.correct);
    } else {
      imageIndex = Math.min(6, imageIndex + 1);
      showDialogue(currentItem.dialogue.incorrect);
    }
    imageElement.src = `image${imageIndex}.png`;
  }

  questions[currentQuestion].classList.remove("active");
  currentQuestion++;
  if (currentQuestion < questions.length) {
    questions[currentQuestion].classList.add("active");
    updateProgress();
    handleAnswerSelection(); // Next button disable logic
    if (currentQuestion === questions.length - 1) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "inline-block";
    }
  }
});

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let score = 0;

  quizData.forEach((item) => {
    const selected = document.querySelector(
      `input[name="${item.key}"]:checked`
    );
    if (selected && selected.value === item.answer) {
      score++;
    }
  });

  document.getElementById(
    "result"
  ).textContent = `You scored ${score} out of 6`;

  if (score >= 3) {
    imageElement.src = "image0.png";
    showDialogue("Great job! You really know your stuff.");
  } else {
    imageElement.src = "image7.png";
    showDialogue("Better luck next time. Keep practicing!");
  }

  submitBtn.style.display = "none";
  progressFill.style.width = "100%";
});
