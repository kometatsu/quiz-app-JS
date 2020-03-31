// DOMの取得
const startButton = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const resultElement = document.getElementById("result");
const commentElement = document.getElementById("comment");
const restartButton = document.getElementById("restart-button");

// クイズ配列
const questionContainer = [
  {
    question: "Who is the strongest?",
    answers: ["Superman", "The Terminator", "Waluigi, obviously"],
    correct_answer: "Waluigi, obviously"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  },
  {
    question: "Where is Waldo really?",
    answers: ["Exploring the Pacific Ocean", "Sitting in a tree", "Antarctica"],
    correct_answer: "Antarctica"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  },
  {
    question: "What is the best site ever created?",
    answers: [
      "Simple Steps Code",
      "Trick question; they're both the best",
      "SitePoint"
    ],
    correct_answer: "SitePoint"
  }
];

let currentIndex = 0; //出題中の問題数のカウント
let isAnswered; //正誤判定有無の区別のための変数
let numberOfCorrects = 0; //正答数のカウント
restartButton.hidden = true; //結果画面表示までリスタートボタンの非表示

// スタートボタンを押したときの挙動
const startQuiz = () => {
  startButton.addEventListener("click", (event) => {
    makeQuiz();
    startButton.hidden = true;
  });
};

// リスタートボタンを押したときの挙動
restartButton.addEventListener("click", (event) => {
  startQuiz();
  restartButton.hidden = true;
});

// 選択肢のシャッフル ※元の配列を上書きしないために、引数の配列をコピーする
const shuffle = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
};

const checkAnswer = (liElement) => {
  // 正誤判定の実施の有無で条件分岐
  if (isAnswered) {
    return;
  }
  isAnswered = true;

  const correctAnswer = questionContainer[currentIndex].correct_answer;
  if (correctAnswer === liElement.textContent) {
    alert("大正解！！");
    numberOfCorrects++;
  } else {
    alert(`不正解... (正解は "${correctAnswer}"です！)`);
  }
  currentIndex++;
  nextQuiz();
};

const nextQuiz = () => {
  removeAllAnswers();
  if (currentIndex < questionContainer.length) {
    makeQuiz(); // 次のクイズ出題
  } else {
    finishQuiz(); // 結果画面の表示
  }
};

//  answerElement　の最初の子要素がある限り、ループで削除する
const removeAllAnswers = () => {
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
};

const finishQuiz = () => {
  questionElement.textContent = "";

  resultElement.textContent = `${questionContainer.length}　問中　${numberOfCorrects}　問正解`;
  if (numberOfCorrects >= 10) {
    commentElement.textContent =
      "素晴らしい！　ファッションの基礎知識は完璧でしょう！";
  } else if (numberOfCorrects >= 8) {
    commentElement.textContent = "惜しい！　もう一度挑戦して完璧にしてみては？";
  } else if (numberOfCorrects >= 5) {
    commentElement.textContent =
      "ファッションにそこそこの知識はありますね！　もう一度チャレンジして完璧を目指してみよう！";
  } else {
    commentElement.textContent =
      "ファッションにあまり興味がないレベル。これを機にファッションに触れてみては？";
  }
  restartButton.hidden = false;
};

// クイズ表示
const makeQuiz = () => {
  isAnswered = false;
  questionElement.textContent = questionContainer[currentIndex].question; // 現在の出題文の表示

  // シャッフルした選択肢の表示
  const shuffleAnswers = shuffle([...questionContainer[currentIndex].answers]);
  shuffleAnswers.forEach((answer) => {
    const liElement = document.createElement("li");
    liElement.textContent = answer;
    liElement.addEventListener("click", () => {
      checkAnswer(liElement);
    });
    answerElement.appendChild(liElement);
  });
};

startQuiz();
