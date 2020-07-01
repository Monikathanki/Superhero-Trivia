//Question and answer database

let STORE = [
  {
    question: "Who made Captain America's shield?",
    answers: [
      "Tony Stark",
      "Natasha Romannoff",
      "Howard Stark",
      "Bruce Banner",
    ],
    correctAnswer: "Howard Stark",
  },
  {
    question: "What is the name of Thor’s hammer?",
    answers: ["Thor", "Shield", "Mjolnir", "Hammer"],
    correctAnswer: "Mjolnir",
  },
  {
    question: "How man Infinity Stones are there?",
    answers: [4, 5, 2, 6],

    correctAnswer: "6",
  },
  {
    question: "In which film’s post-credit scene did Thanos first appear?",
    answers: ["The Avengers", "Iron Man", "Avengers: Endgame", "Spider-Man"],
    correctAnswer: "The Avengers",
  },

  {
    question: "Who played Tony Stark in Iron Man?",
    answers: ["Matt Damon", "Stan Lee", "Robert Downey Jr", "D.	Michael Keaton"],

    correctAnswer: "Robert Downey Jr",
  },
];
//quesitonNumber and score variables to store information

let great = [
    "Great job!",
    "images/iron-man.jpg",
    "Iron Man Picture",
    "you sure know a lot about Superheros!",
  ];

  let good = [
    "Good Job!",
    "images/Thore.jpg",
    "Thore's Picture",
    "Not bad!"
  ]

  let bad = [
  "Sorry! Better luck next time!", 
  "images/sad-iron-man.jpg",
  "sad Iron Man picture",
  "you need to watch more Superheros Movie!",
  ]

let score = 0;
let questionNumber = 0;

function generateQuestion() {
  if (questionNumber < STORE.length) {
//Question and answer database
    return renderQuestionList(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(05);
  }
}

//increements the number value of the "score" variable by adding 10 
// and update the "score" number text in the quiz view 


function updateScore() {
  score = score + 10;
  $('.score').text(score);
}

//increments the number value of the "question Number" variable by one
// and updates the "questionNumber" text in the quiz view

function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "questionNumber" and "score" variables
// and updates their repective text in the quiz

function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}
// the quiz begins
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });

}
//submits a selected answer and checks it against the correct answer
//runs answer fucntion accordingly 

function submitAnswer() {
  $('.galaxyBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      $('.response').html(correctAnswer);
        updateScore();
    } else {
      $('.response').html(wrongAnswer);
    }
  });
}

//creates html form for question
function renderQuestionList(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)
  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="quizMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);

  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

// if a selected answer is correct result feedback appear
//increments user score by 10
function correctAnswer() {
  return `<h3> Your answer is correct!</h3>
        <img src="images/happy-hulk.jpg" alt="dancing hulk" class="images">
        <p class="quizMe">You're a Superhero!</p>
        <button type="button" class="nextButton button">Next</button>`;
}

// if a selected answer is incorrect resulting feedback appear
function wrongAnswer() {
  return `<h3>That's the wrong answer.</h3>
      <img src="images/hulk-sad.jpg" alt="crying hulk" class="images">
      
      <p class="quizMe">Correct Answer is...</p>
      <p class="quizMe">${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`;
}

//next  question generates
function nextQuestion() {
  $('.galaxyBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}


//final score and feedback at the end of the quiz determines
function finalScore() {
  $('.final').show();

  if (score >= 40) {
    array = great;
  } else if (score < 40 && score >= 30) {
    array = good;
  } else {
    array = bad;
  }
  
  return $('.final').html(
    `<h3>${array[0]}</h3>
    <img src="${array[1]}" alt="${array[2]}" class="images"> 
    <h3> Your score is ${score} / 50</h3>
    <p class="quizMe"> ${array[3]}</p>
    <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz 
function restartQuiz() {
  $('.galaxyBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the function 
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);