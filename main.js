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
    question: "Q1.次のブランドは何と読む？『A.P.C.』",
    answers: ["エー・ピー・シー", "アパック", "アー・ペー・セー"],
    correct_answer: "アー・ペー・セー"
  },
  {
    question: "Q2.次のブランドは何と読む？『agnes b.』",
    answers: ["アグネス・ベー", "アニエス・ビー", "アニエス・ベー"],
    correct_answer: "アニエス・ベー"
  },
  {
    question: "Q3.次のブランドは何と読む？『Saint Laurent』",
    answers: ["サンローレント", "セイントローレント", "サンローラン"],
    correct_answer: "サンローラン"
  },
  {
    question:
      "Q4.カーキ、モスグリーン、ベージュ、ブラウンなどの色をなんという??",
    answers: ["ナチュラルカラー", "パステルカラー", "アースカラー"],
    correct_answer: "アースカラー"
  },
  {
    question: "Q5.ミリタリーのルーツは？",
    answers: ["海軍", "陸軍", "軍隊"],
    correct_answer: "軍隊"
  },
  {
    question: "Q6.綿（コットン）素材の特徴で当てはまらないものは？",
    answers: [
      "吸湿性があり、涼しく感じる",
      "強度があり丈夫",
      "シワが寄りにくい"
    ],
    correct_answer: "シワが寄りにくい"
  },
  {
    question: "Q7.次の中で「ドレスアイテム」に当てはまるものはどれ？",
    answers: ["レザージャケット", "デニムジャケット", "テーラードジャケット"],
    correct_answer: "テーラードジャケット"
  },
  {
    question:
      "Q8.太ももから足首にかけて徐々に細くなるパンツの形のことを何というか？",
    answers: ["サルエル", "フレア", "テーパード"],
    correct_answer: "テーパード"
  },
  {
    question: "Q9.流行に左右されないデザインの服のことを何という？",
    answers: ["カジュアル", "アヴァンギャルド", "トラッド"],
    correct_answer: "トラッド"
  },
  {
    question:
      "Q10.飾り気のないスタイル&ファッションアイテムを使った着こなしのジャンルを何という？",
    answers: ["アメカジ", "モード", "ノームコア"],
    correct_answer: "ノームコア"
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
