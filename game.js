const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "Siapakah Bapak Proklamator Indonesia?",
        choice1: "Dr. Soepomo",
        choice2: "Muh. Yamin",
        choice3: "Ir. Soekarno",
        choice4: "Soeharto",
        answer: 3,
    },
    {
        question: "Siapakah Bapak Koperasi Indonesia?",
        choice1: "Soeharto",
        choice2: "Radjiman Widyodiningrat",
        choice3: "Muh. Yamin",
        choice4: "Pangeran Diponegoro",
        answer: 1,
    },
    {
        question: "Siapakah yang disebut sebagai Bapak Pendidikan Indonesia?",
        choice1: "Ki Hadjar Dewantara",
        choice2: "Muh. Yamin",
        choice3: "Bj. Habibie",
        choice4: "Soepomo",
        answer: 1,
    },
    {
        question: "Kapan hari Kartini diperingati?",
        choice1: "01 Juni",
        choice2: "21 Mei",
        choice3: "11 Maret",
        choice4: "21 April",
        answer: 4,
    },
    {
        question: "Kapan hari lahir Pancasila diperingati?",
        choice1: "21 Mei",
        choice2: "01 Juni",
        choice3: "11 Maret",
        choice4: "10 November",
        answer: 2,
    },
    {
        question: "Kapan hari Sumpah Pemuda diperingati?",
        choice1: "21 April",
        choice2: "10 November",
        choice3: "28 Oktober",
        choice4: "11 Maret",
        answer: 3,
    },
    {
        question: "Siapakah laksamana wanita pertama di dunia?",
        choice1: "Keumalahayati",
        choice2: "Cut Nyak Dhien",
        choice3: "Cut Meutia",
        choice4: "Teuku Nyak Arif",
        answer: 1,
    },
    {
        question: "Pahlawan wanita yang berasal dari Jawa Barat adalah?",
        choice1: "R.A Kartini",
        choice2: "Dewi Sartika",
        choice3: "Fatmawati",
        choice4: "Rohana Kudus",
        answer: 2,
    },
    {
        question: "Pahlawan yang dijuluki Si Jalak Harupat adalah?",
        choice1: "Djuanda Kartawijaya",
        choice2: "Sultan Hasanuddin",
        choice3: "Otto Iskandar Dinata",
        choice4: "Mohammad Toha",
        answer: 3,
    },
    {
        question: "Pahlawan yang dijuluki Ayam Jantan Dari Timur adalah?",
        choice1: "Djuanda Kartawijaya",
        choice2: "Sultan Hasanuddin",
        choice3: "Otto Iskandar Dinata",
        choice4: "Mohammad Toha",
        answer: 2,
    },
];


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
