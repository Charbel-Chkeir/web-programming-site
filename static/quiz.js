// ======================================================
// QUESTIONS
// ======================================================

// Populate this array with question objects as needed.
// Each question object should have the following structure:
//   {
//     question:
//       "Which keyword declares a block-scoped variable that can later be reassigned?",
//     choices: ["var", "let", "const", "static"],
//     answer: 1,
//     explanation:
//       "let declares a block-scoped variable whose value may later be reassigned.",
//   },

const questions = [
  {
    question:
      "A baseband signal contains frequency components up to 8 kHz. According to the Nyquist sampling theorem, what is the minimum theoretical sampling frequency required to avoid aliasing?",
    choices: ["8 kHz", "12 kHz", "16 kHz", "32 kHz"],
    answer: 2,
    explanation:
      "The sampling frequency must satisfy fs ≥ 2fmax. Therefore, fs ≥ 2(8) = 16 kHz.",
  },

  {
    question:
      "Which type of cache miss occurs when two different memory blocks repeatedly map to the same cache location?",
    choices: [
      "Conflict miss",
      "Compulsory miss",
      "Capacity miss",
      "Translation miss",
    ],
    answer: 0,
    explanation:
      "A conflict miss occurs because multiple memory blocks compete for the same cache set or line, even when unused cache capacity may exist elsewhere.",
  },

  {
    question:
      "In QPSK, how many bits are represented by each transmitted symbol?",
    choices: ["1 bit", "4 bits", "8 bits", "2 bits"],
    answer: 3,
    explanation:
      "QPSK has four possible phase states. Since log₂(4) = 2, each symbol represents 2 bits.",
  },

  {
    question:
      "What is the main purpose of an anti-aliasing filter before an analog-to-digital converter?",
    choices: [
      "Increase the sampling frequency",
      "Remove frequency components above the usable Nyquist frequency",
      "Convert digital signals into analog signals",
      "Increase quantization resolution",
    ],
    answer: 1,
    explanation:
      "An anti-aliasing low-pass filter limits the input bandwidth so high-frequency components do not fold into lower frequencies after sampling.",
  },

  {
    question:
      "For an additive white Gaussian noise (AWGN) channel with bandwidth B and signal-to-noise ratio S/N, Shannon's channel capacity is:",
    choices: [
      "C = B(S/N)",
      "C = 2B log₂(S/N)",
      "C = B log₂(1 + S/N)",
      "C = log₂(B + S/N)",
    ],
    answer: 2,
    explanation:
      "Shannon's capacity theorem gives C = B log₂(1 + S/N), where C is the maximum theoretical error-free data rate in bits/s.",
  },

  {
    question:
      "For a JK flip-flop, what happens when J = 1 and K = 1 at the active clock edge?",
    choices: [
      "The output toggles",
      "The output resets to 0",
      "The output remains unchanged",
      "The output is always set to 1",
    ],
    answer: 0,
    explanation:
      "When both inputs are 1, a JK flip-flop changes its current state: Qnext = Q̅.",
  },

  {
    question:
      "An antenna has a power gain of 10 dBi. Approximately what is its linear power gain relative to an isotropic antenna?",
    choices: ["2", "100", "3.16", "10"],
    answer: 3,
    explanation:
      "Glinear = 10^(GdBi/10) = 10^(10/10) = 10. Therefore, 10 dBi corresponds to a linear power gain of 10.",
  },

  {
    question:
      "What is the principal advantage of using an interrupt instead of continuously polling an I/O device?",
    choices: [
      "It eliminates the need for memory",
      "It guarantees zero interrupt latency",
      "It increases the device's physical transmission speed",
      "It allows the CPU to perform other work until the device requires attention",
    ],
    answer: 3,
    explanation:
      "With interrupts, the CPU does not need to repeatedly check device status and can execute other instructions until an event occurs.",
  },

  {
    question:
      "If the frequency of an electromagnetic wave traveling through free space is doubled, what happens to its wavelength?",
    choices: [
      "It doubles",
      "It is halved",
      "It remains unchanged",
      "It becomes four times larger",
    ],
    answer: 1,
    explanation:
      "Since c = fλ and c is constant in free space, doubling f causes λ to decrease by a factor of two.",
  },

  {
    question:
      "A communication link has a bandwidth of 1 MHz and an SNR of 15 expressed as a linear power ratio. Using Shannon's theorem, approximately what is the maximum theoretical channel capacity?",
    choices: ["1 Mbps", "15 Mbps", "4 Mbps", "16 Mbps"],
    answer: 2,
    explanation:
      "C = B log₂(1 + S/N) = 10⁶ log₂(16) = 10⁶(4) = 4 × 10⁶ bits/s. Therefore, the theoretical maximum capacity is 4 Mbps.",
  },
];


// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

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
    if (currentQuestion < questions.length - 1) 
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
      currentQuestion = questions.length - 1;
      renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
  //   Calculate the user's score based on their answers.
    let score = 0;
    let i = 0;

  for (i; i < questions.length; i++) 
    {
      if (userAnswers[i] === questions[i].answer) 
        {
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
  return Math.round((score / questions.length) * 100);
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

function buildCorrection() {
  let correction = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

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
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------
  document.getElementById("questionText").textContent = q.question;

  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();
