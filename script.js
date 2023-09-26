const content_container = document.getElementById("content-container");
const quit_conainer = document.getElementById("quit-container");
const answersContainer = document.getElementById("answersContainer");
const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const heartsCountElement = document.getElementById("heartsCountElement");
const successContainer = document.getElementById("successContainer");
const failedContainer = document.getElementById("failedContainer");
const levelScoreIndicator = document.getElementById("levelScoreIndicator");

let characterEl = document.getElementById("character");
let indicator = 0;
let toTranlate = document.getElementById("toTranslate");
let trueShow = document.getElementById("trueShow");

const gif_urls = [
  "img/1stGif.gif", //1
  "img/2ndGif.gif", //2
  "img/3rdGif.gif", //3
  "img/4thGif.gif", //4
  "img/5thGif.gif", //5
  "img/6thGif.gif", //6
  "img/7thGif.gif", //7
  "img/8thGif.gif", //8
  "img/9thGif.gif", //9
  "img/10thGif.gif", //10
];

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
  let finalAnswer = forOutput.concat(forOutput2);
  if (finalAnswer.length != 0) {
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
  } else {
    alert("Zəhmət olmasa, secim edin.");
  }
}

function success() {
  if (indicator < 100) {
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
    characterEl.src = `${gif_urls[taskCounter]}`;
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

function close_btn() {
  document.querySelector(".main-content").style.display = "none";
  quit_conainer.style.display = `block`;
  content_container.style.backgroundImage = `url('https://i.pinimg.com/736x/47/b6/6e/47b66e5795b5a857822adeaf342eaf8a.jpg')`;
  content_container.style.backgroundSize = "100%";
  quit_conainer.innerHTML = `<div class = 'realyQuit'><p>Are you sure?</p> <button class="ctrl-btn-quit" onclick='sureToQuit()'>Sure</button> <button class="ctrl-btn-quit" onclick='notSureToQuit()'>No..</button><div>`;
}
function sureToQuit() {
  content_container.style.background = `url('https://image.winudf.com/v2/image1/Z2lhcC5sZ2UudXg4X3NjcmVlbl8wXzE1NTU0OTM3MjZfMDk0/screen-1.webp?fakeurl=1&type=.webp')`;
  content_container.style.backgroundSize = "100%";
  quit_conainer.style.display = `none`;
}
function notSureToQuit() {
  content_container.style.backgroundImage = `none`;
  document.querySelector(".main-content").style.display = "block";
  quit_conainer.style.display = `none`;
}
answersLoad();
