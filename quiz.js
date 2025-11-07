const welcomeSection = document.getElementById("welcomeSection");
const quizContainer = document.querySelector(".quiz-container");
const startBtn = document.getElementById("startBtn");
const questions = document.querySelectorAll(".question");
const progressFill = document.getElementById("progressFill");
const imageElement = document.getElementById("quizImage");
const dialogueBox = document.getElementById("dialogueBox");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const helpBtn = document.getElementById("helpBtn");
const helpOverlay = document.getElementById("helpOverlay");
const closeHelp = document.getElementById("closeHelp");
let currentQuestion = 0;
let imageIndex = 5;
let wrongStreak = 0;

// Help popup
helpBtn.addEventListener("click", () => {
  helpOverlay.style.display = "flex";
});

closeHelp.addEventListener("click", () => {
  helpOverlay.style.display = "none";
});

startBtn.addEventListener("click", () => {
  // Reset state
  currentQuestion = 0;
  wrongStreak = 0;
  imageIndex = 5;
  progressFill.style.width = "0%";
  quizContainer.style.backgroundColor = "";

  // Reset UI
  welcomeSection.style.display = "none";
  quizContainer.style.display = "block";
  questions.forEach((q) => q.classList.remove("active"));
  questions[currentQuestion].classList.add("active");
  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  imageElement.src = "image5.png";
  dialogueBox.innerHTML = "";

  // Reset answers
  quizData.forEach((item) => {
    const options = document.querySelectorAll(`input[name="${item.key}"]`);
    options.forEach((opt) => (opt.checked = false));
  });

  handleAnswerSelection();
});

function handleAnswerSelection() {
  const currentItem = quizData[currentQuestion];
  const options = document.querySelectorAll(`input[name="${currentItem.key}"]`);
  nextBtn.disabled = true;

  options.forEach((option) => {
    option.addEventListener("change", () => {
      nextBtn.disabled = false;
    });
  });
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

nextBtn.addEventListener("click", () => {
  const currentItem = quizData[currentQuestion];
  const selected = document.querySelector(
    `input[name="${currentItem.key}"]:checked`
  );

  if (selected) {
    if (selected.value === currentItem.answer) {
      imageIndex = Math.max(1, imageIndex - 1);
      showDialogue(currentItem.dialogue.correct);
      wrongStreak = 0;
    } else {
      imageIndex = Math.min(8, imageIndex + 1);
      showDialogue(currentItem.dialogue.incorrect);
      wrongStreak++;

      if (wrongStreak >= 4) {
        quizContainer.style.backgroundColor = "red";
        imageElement.src = "image9.png";
        showDialogue("You're on a streak, cowboy... the wrong kind of streak.");
        nextBtn.style.display = "none";
        submitBtn.style.display = "none";
        progressFill.style.width = "100%";
        restartBtn.style.display = "inline-block";
        return;
      }
    }

    imageElement.src = `image${imageIndex}.png`;
  }

  questions[currentQuestion].classList.remove("active");
  currentQuestion++;
  if (currentQuestion < questions.length) {
    questions[currentQuestion].classList.add("active");
    updateProgress();
    handleAnswerSelection();
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
    showDialogue(
      "You're hired, matey. Pack your stuff and get aboard, we're space-bound by sundown."
    );
  } else {
    imageElement.src = "image9.png";
    showDialogue("Too bad, landlubber... Your ignorance offends me.");
  }

  submitBtn.style.display = "none";
  progressFill.style.width = "100%";
  restartBtn.style.display = "inline-block";
});

restartBtn.addEventListener("click", () => {
  // Reset state
  currentQuestion = 0;
  wrongStreak = 0;
  imageIndex = 5;
  progressFill.style.width = "0%";
  quizContainer.style.backgroundColor = "";

  // Reset UI
  quizContainer.style.display = "none";
  welcomeSection.style.display = "block";
  questions.forEach((q) => q.classList.remove("active"));
  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  imageElement.src = "image5.png";
  dialogueBox.innerHTML = "";
  document.getElementById("result").textContent = "";

  // Reset answers
  quizData.forEach((item) => {
    const options = document.querySelectorAll(`input[name="${item.key}"]`);
    options.forEach((opt) => (opt.checked = false));
  });
});
