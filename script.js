let answersContainer = document.getElementById("answersContainer");
let output1 = document.getElementById("output1");
let output2 = document.getElementById("output2");
let heartCount = 5;
let heartsCountElement = document.getElementById("heartsCountElement");

const answersArr = [
  "Onun",
  "edersiz",
  "Boz",
  "eder",
  "ederler",
  "işi",
  "Baz",
  "devam",
];

const answersLoad = () => {
  answersContainer.innerHTML = `<div></div>`;
  answersArr.forEach(
    (answer) =>
      (answersContainer.innerHTML += `<div onclick='detonate(${answersArr.indexOf(
        answer
      )})' class='answer-cloud'>${answer}</div>`)
  );
};

let forOutput = [];
let forOutput2 = [];
let flag = -1;
let blackFlag = -1;
let forOutputCount = 0;
let forOutput2Count = 0;

function detonate(index) {
  if (forOutputCount <= 3) {
    flag++;
    const selectedWord = answersArr[index];
    forOutput.push(selectedWord);
    forOutputCount++;
    output1.innerHTML += `<div onclick='closeMe(this, "${selectedWord}")' id='a${flag}' class='answer-cloud'>${selectedWord}</div>`;
    answersArr.splice(index, 1);
  } else if (forOutput2Count <= 3) {
    blackFlag++;
    const selectedWord = answersArr[index];
    forOutput2.push(selectedWord);
    forOutput2Count++;
    output2.innerHTML += `<div onclick='closeMe2(this, "${selectedWord}")' id='b${blackFlag}' class='answer-cloud'>${selectedWord}</div>`;
    answersArr.splice(index, 1);
  } else {
    alert("OK?");
  }
  answersLoad();
}

function closeMe(element, word) {
  answersArr.push(word);
  output1.removeChild(element);
  answersLoad();
  forOutputCount--;
  forOutput.pop();
}

function closeMe2(element, word) {
  answersArr.push(word);
  output2.removeChild(element);
  answersLoad();
  forOutput2Count--;
  forOutput2.pop();
}

answersLoad();
const rightAnswer = ["Onun", "işi", "devam", "eder"];
let finalAnswer = [];

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
  document.getElementById("successContainer").style.bottom = "0px";
}
function failed() {
  document.getElementById("failedContainer").style.bottom = "0px";
}
function tryAgain() {
  document.getElementById("failedContainer").style.bottom = "-110px";
}
function newLvl() {
  document.getElementById("successContainer").style.bottom = "-110px";
}

function gameOver() {
  if (heartCount == 0) {
    document.body.innerHTML =
      "<div><h1 style='margin: 100px auto; font-size: 140px; color:red;'>GAME OVER!</h1></div>";
  }
}
