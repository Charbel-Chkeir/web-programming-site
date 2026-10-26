
let total = 0;
const cache = {};


async function getQuestion(index) {
  if (cache[index] !== undefined) {
    return cache[index];
  }

  const response = await fetch(`/api/question/${index}`);

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const question = await response.json();
  cache[index] = question;

  return question;
}


// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = [];

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
  //   Save the user's answer for the current question.
  userAnswers[currentQuestion] = choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
  //   Move to the next question if not at the last question.
    if (currentQuestion < total - 1)
      {
        currentQuestion++;
        renderQuestion();
      }
}

function goPrevious() {
  //   Move to the previous question if not at the first question.
    if (currentQuestion > 0)
      {
        currentQuestion--;
        renderQuestion();
      }
}

function goFirst() {
  //   Move to the first question.
      currentQuestion = 0;
      renderQuestion();
}

function goLast() {
  //   Move to the last question.
      currentQuestion = total - 1;
      renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
async function calculateScore() {
  let score = 0;

  for (let i = 0; i < total; i++) {
    const q = await getQuestion(i);

    if (userAnswers[i] === q.answer) {
      score++;
    }
  }

  return score;
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
  //   Calculate the percentage score based on the total number of questions.
  return Math.round((score / total) * 100);
}

// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
  //   Return a performance message based on the percentage score.
    if (percentage >= 80)
      {
        return "Excellent";
      }

    else if (percentage >= 60)
      {
        return "Good";
      }

    else if (percentage >= 50)
      {
        return "Pass";
      }

    else
      {
        return "Needs improvement";
      }
}

// ======================================================
// BUILD CORRECTION
// ======================================================

  //   Build a correction string that includes the question, the user's answer,
  //   the correct answer, and an explanation for each question.

async function buildCorrection() {
  let correction = "";

  for (let i = 0; i < total; i++) {
    const q = await getQuestion(i);

    const userAnswerIndex = userAnswers[i];
    const correctAnswerIndex = q.answer;

    const userAnswer =
      userAnswerIndex === undefined
        ? "Not Answered"
        : q.choices[userAnswerIndex];

    const correctAnswer = q.choices[correctAnswerIndex];

    const result =
      userAnswerIndex === correctAnswerIndex
        ? "Correct"
        : "Incorrect";

    correction +=
      "- QUESTION " + (i + 1) + " -\n" + "-----------------\n" +
      q.question + "\n\n" +
      "Your answer: " + userAnswer + "\n" +
      "Correct answer: " + correctAnswer + "\n" +
      "Result: " + result + "\n\n" +
      "Explanation:\n" +
      q.explanation + "\n" +
      "=================================================================\n\n\n";

  }

  return correction;
}

// ======================================================
// PROVIDED INTERFACE CODE
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
async function submitQuiz() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  loading.hidden = false;
  error.hidden = true;
  error.textContent = "";

  const controls = document.querySelectorAll(
  "#quizPanel button, #quizPanel input"
  );
  const disabledStates = [];

  for (const control of controls) {
    disabledStates.push(control.disabled);
    control.disabled = true;
  }

  try {
    const score = await calculateScore();
    const percentage = calculatePercentage(score);
    const message = getPerformanceMessage(percentage);
    const correction = await buildCorrection();

    showResults(score, percentage, message, correction);
  } catch (err) {
    error.textContent = "Could not submit the quiz: " + err.message;
    error.hidden = false;
  } finally {
    loading.hidden = true;

    for (let i = 0; i < controls.length; i++) {
      controls[i].disabled = disabledStates[i];
    }
  }
}

async function renderQuestion() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const choicesContainer = document.getElementById("choices");
  const buttons = document.querySelectorAll("#quizPanel button");

  loading.hidden = false;
  error.hidden = true;
  error.textContent = "";

  document.getElementById("questionText").textContent = "";
  choicesContainer.innerHTML = "";

  for (const button of buttons) {
    button.disabled = true;
  }

  document.getElementById("progress").textContent =
  `Question ${currentQuestion + 1} of ${total}`;

  let loaded = false;

  try {
    const q = await getQuestion(currentQuestion);

    document.getElementById("questionText").textContent = q.question;

    for (let i = 0; i < q.choices.length; i++) {
      const label = document.createElement("label");
      label.className = "choice";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = i;

      if (userAnswers[currentQuestion] === i) {
        radio.checked = true;
      }

      radio.onclick = function () {
        saveAnswer(i);
      };

      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + q.choices[i]));
      choicesContainer.appendChild(label);
    }

    loaded = true;
  } catch (err) {
    error.textContent = "Could not load the question: " + err.message;
    error.hidden = false;
  } finally {
    loading.hidden = true;

    document.getElementById("firstBtn").disabled =
      currentQuestion === 0;
    document.getElementById("previousBtn").disabled =
      currentQuestion === 0;
    document.getElementById("nextBtn").disabled =
      currentQuestion === total - 1;
    document.getElementById("lastBtn").disabled =
      currentQuestion === total - 1;

    document.querySelector("#quizPanel .submit").disabled = !loaded;
  }
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${total}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
async function init() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const buttons = document.querySelectorAll("#quizPanel button");

  loading.hidden = false;
  error.hidden = true;
  error.textContent = "";

  for (const button of buttons) {
    button.disabled = true;
  }

  try {
    const response = await fetch("/api/questions/count");

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const data = await response.json();
    total = data.count;

    if (total <= 0) {
      throw new Error("No questions are available.");
    }

    await renderQuestion();
  } catch (err) {
    error.textContent = "Could not start the quiz: " + err.message;
    error.hidden = false;
  } finally {
    loading.hidden = true;
  }
}

init();
