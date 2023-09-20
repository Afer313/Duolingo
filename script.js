const answersContainer = document.getElementById("answersContainer");
const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const heartsCountElement = document.getElementById("heartsCountElement");
const successContainer = document.getElementById("successContainer");
const failedContainer = document.getElementById("failedContainer");
const levelScoreIndicator = document.getElementById('levelScoreIndicator');
let indicator = 0;

const answersArr = ["Onun", "edersiz", "Boz", "eder", "ederler", "işi", "Baz", "devam"];
const rightAnswer = ["Onun", "işi", "devam", "eder"];

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
  output1.innerHTML = forOutput.map(word => `<div onclick="giveMeBackPlease('${word}', 1)" class="answer-cloud">${word}</div>`).join("");
  output2.innerHTML = forOutput2.map(word => `<div onclick="giveMeBackPlease('${word}', 2)" class="answer-cloud">${word}</div>`).join("");
}

function giveMeBackPlease(wordValue, set) {
  const selectedArray = set === 2 ? forOutput2 : forOutput;
  const elementsInsideContainer = answersContainer.getElementsByTagName("*");
  for (let i = 0; i < elementsInsideContainer.length; i++) {
    const element = elementsInsideContainer[i];
    if (element.innerHTML === wordValue) {
      element.classList.remove('grayed-box');
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
      if(indicator<100){
        indicator +=10;
      }
      levelScoreIndicator.style.width = `${indicator}%`;
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
  successContainer.style.bottom = "0px";
}
function failed() {
  failedContainer.style.bottom = "0px";
}
function tryAgain() {
  failedContainer.style.bottom = "-110px";
}
function newLvl() {
  successContainer.style.bottom = "-110px";
}

function gameOver() {
  if (heartCount == 0) {
    document.body.innerHTML = "<div><h1 style='margin: 100px auto; font-size: 140px; color:red;'>GAME OVER!</h1></div>";
  }
}

answersLoad();
