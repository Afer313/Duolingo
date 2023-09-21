const answersContainer = document.getElementById("answersContainer");
const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const heartsCountElement = document.getElementById("heartsCountElement");
const successContainer = document.getElementById("successContainer");
const failedContainer = document.getElementById("failedContainer");
const levelScoreIndicator = document.getElementById("levelScoreIndicator");
let indicator = 0;
let toTranlate = document.getElementById("toTranslate");
let trueShow = document.getElementById("trueShow");

const toTranlateValues = [
  "His work is continues.", //1
  "I am hungry.", //2
  "Do you like soccer?", //3
  "What about you?", //4
  "Bublik is my dog.", //5
  "There is a school on your left.", //6
  "Put these books on the table.", //7
  "Is there library in your home?", //8
  "Let's go to the picnic tomorrow.", //9
  "Is it your coffee?", //10
];
const toTranlateValuesTranslated = [
  "Onun işi davam edər.", //1
  "Mən acam.", //2
  "Sən futbolu sevirsən?", //3
  "Bəs sən?", //4
  "Bublik mənim itimdir.", //5
  "Sənin solunda məktəb var.", //6
  "Bu kitabları masanın üstünə qoy.", //7
  "Sənin evində kitabaxa var?", //8
  "Gəl sabah pikninə gedək.", //9
  "Bu kofe sənindir?", //10
];
taskCounter = 0;

const levels = [
  //1
  {
    answersArr: [
      "Onun",
      "edərsiz",
      "Boz",
      "edir",
      "edərlər",
      "işi",
      "Baz",
      "davam",
    ],
    rightAnswer: ["Onun", "işi", "davam", "edir"],
  },
  //2
  {
    answersArr: [
      "Biz",
      "acam",
      "yorğundur",
      "Qəti",
      "Salam",
      "Mən",
      "gül",
      "Niyə",
    ],
    rightAnswer: ["Mən", "acam"],
  },
  //3
  {
    answersArr: [
      "sevirsən",
      "O",
      "sürürəm",
      "Mən",
      "maşını",
      "futbolu",
      "səni",
      "Sən",
    ],
    rightAnswer: ["Sən", "futbolu", "sevirsən"],
  },
  //4
  {
    answersArr: ["it", "sən", "olar", "Bəs", "nömrə", "var", "Kim", "haqqında"],
    rightAnswer: ["Bəs", "sən"],
  },
  //5
  {
    answersArr: [
      "onun",
      "mənim",
      "itdir",
      "Bublik",
      "uçur",
      "istidir",
      "Çay",
      "itimdir",
    ],
    rightAnswer: ["Bublik", "mənim", "itimdir"],
  },
  //6
  {
    answersArr: [
      "solunda",
      "varlı",
      "məktəb",
      "Evdə",
      "quş",
      "Sənin",
      "səni",
      "var",
    ],
    rightAnswer: ["Sənin", "solunda", "məktəb", "var"],
  },
  //7
  {
    answersArr: [
      "kitabları",
      "Telefonu",
      "qoy",
      "Bu",
      "götür",
      "üstünə",
      "masanın",
      "üstündən",
    ],
    rightAnswer: ["Bu", "kitabları", "masanın", "üstünə", "qoy"],
  },
  //8
  {
    answersArr: [
      "var",
      "evində",
      "mətbəx",
      "Sənin",
      "fincan",
      "Mənim",
      "top",
      "kitabxana",
    ],
    rightAnswer: ["Sənin", "evində", "kitabxana", "var"],
  },
  //9
  {
    answersArr: [
      "Gəl",
      "Get",
      "sabah",
      "gəzintiyə",
      "evdə",
      "gedək",
      "oturaq",
      "piknikə",
    ],
    rightAnswer: ["Gəl", "sabah", "piknikə", "gedək"],
  },
  //10
  {
    answersArr: [
      "Bu",
      "dolu",
      "eyvanda",
      "O",
      "sənindir",
      "süd",
      "içirsən",
      "kofe",
    ],
    rightAnswer: ["Bu", "kofe", "sənindir"],
  },
];

let answersArr = levels[taskCounter].answersArr;
let rightAnswer = levels[taskCounter].rightAnswer;

let heartCount = 5;
let forOutput = [];
let forOutput2 = [];

function moveWordToFirstLine() {
  if (forOutput.length < 4 && forOutput2.length > 0) {
    const wordToMove = forOutput2.shift();
    forOutput.unshift(wordToMove);
    updateOutputFields();
  }
}

function answersLoad() {
  answersContainer.innerHTML = "";
  answersArr.forEach((answer, index) => {
    if (!forOutput.includes(answer) && !forOutput2.includes(answer)) {
      const answerElement = document.createElement("div");
      answerElement.className = "answer-cloud";
      answerElement.textContent = answer;
      answerElement.onclick = () => detonate(index);
      answersContainer.appendChild(answerElement);
    }
  });
}

function detonate(index) {
  const selectedWord = answersArr[index];

  if (forOutput.length < 4) {
    forOutput.push(selectedWord);
  } else if (forOutput2.length < 4) {
    forOutput2.push(selectedWord);
  } else {
    alert("OK?");
  }
  moveWordToFirstLine();

  const selectedElement = answersContainer.children[index];
  if (selectedElement) {
    selectedElement.classList.add("grayed-box");
  }
  updateOutputFields();
}

function updateOutputFields() {
  output1.innerHTML = forOutput
    .map(
      (word) =>
        `<div onclick="giveMeBackPlease('${word}', 1)" class="answer-cloud">${word}</div>`
    )
    .join("");
  output2.innerHTML = forOutput2
    .map(
      (word) =>
        `<div onclick="giveMeBackPlease('${word}', 2)" class="answer-cloud">${word}</div>`
    )
    .join("");
}

function giveMeBackPlease(wordValue, set) {
  const selectedArray = set === 2 ? forOutput2 : forOutput;
  const elementsInsideContainer = answersContainer.getElementsByTagName("*");
  for (let i = 0; i < elementsInsideContainer.length; i++) {
    const element = elementsInsideContainer[i];
    if (element.innerHTML === wordValue) {
      element.classList.remove("grayed-box");
    }
  }

  const indexToRemove = selectedArray.indexOf(wordValue);
  if (indexToRemove !== -1) {
    selectedArray.splice(indexToRemove, 1);
  }

  updateOutputFields();
  moveWordToFirstLine();
}

function control() {
  finalAnswer = forOutput.concat(forOutput2);
  if (finalAnswer.length !== rightAnswer.length) {
    failed();
    heartCount--;
    if (heartCount < 0) {
      heartCount = 0;
    }
    heartsCountElement.innerHTML = heartCount;
    gameOver();
  } else {
    let correct = true;
    for (let i = 0; i < rightAnswer.length; i++) {
      if (finalAnswer[i] !== rightAnswer[i]) {
        correct = false;
        break;
      }
    }
    if (correct) {
      success();
    } else {
      failed();
      heartCount--;
      if (heartCount < 0) {
        heartCount = 0;
      }
      heartsCountElement.innerHTML = heartCount;
      gameOver();
    }
  }
}

function success() {
  if(indicator<100){
    indicator += 10;
  }
  successContainer.style.bottom = "0px";
  levelScoreIndicator.style.width = `${indicator}%`;
}
function failed() {
  trueShow.innerHTML = toTranlateValuesTranslated[taskCounter];
  failedContainer.style.bottom = "0px";
}
function tryAgain() {
  failedContainer.style.bottom = "-110px";
}
function newLvl() {
  successContainer.style.bottom = "-110px";
  if (indicator < 100) {
    taskCounter++;
    toTranlate.innerHTML = toTranlateValues[taskCounter];
    answersArr = levels[taskCounter].answersArr;
    rightAnswer = levels[taskCounter].rightAnswer;
    output1.innerHTML = "";
    output2.innerHTML = "";
    forOutput = [];
    forOutput2 = [];
    answersLoad();
  }
}

function gameOver() {
  if (heartCount == 0) {
    document.body.innerHTML =
      "<div><h1 style='margin: 100px auto; font-size: 140px; color:red;'>GAME OVER!</h1></div>";
  }
}

answersLoad();
