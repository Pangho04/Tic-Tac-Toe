// import { isFirstRun } from "vitest";
import "./style.css";
const player1 = {color : 1, figure : 1, att : 1, check : [], undo : 3, name : "player1", resetAtt : 0};
const player2 = {color : 2, figure : 2, att : 0, check : [], undo : 3, name : "player2", resetAtt : 0};
const drawGame = {check : true};
let success = []; // 정답배열 들어갈 곳, 성공시 정답 배열 초기화를 위해 let 사용

const startButton = document.querySelector(".game-start");
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const boardColor1 = document.querySelector(".player-board-color");
const boardColor2 = document.querySelector(".player-board-color2");
const boardFigure1 = document.querySelector(".player-board-figure1")
const boardFigure2 = document.querySelector(".player-board-figure2")
const infoFigure1 = document.querySelector(".info-figure1");
const infoFigure2 = document.querySelector(".info-figure2");
const historyBack = document.querySelector(".history-back-button");
const lineCount = document.getElementById("game-line-count");
const lineCountUp = document.querySelector(".line-count-up");
const lineCountDown = document.querySelector(".line-count-down");
const gameCount = document.getElementById("game-win-count")
const gameOptionUp = document.querySelector(".game-option-up");
const gameOptionDown = document.querySelector(".game-option-down");
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");
const gameBoard = document.getElementById("game-board");
const firstAtt = document.getElementById("attack");
const restartBtn = document.querySelector(".restart-button");
const undoBtn = document.querySelector(".info-undo");
const openRestartBtn = document.querySelector(".restart-button");


undoBtn.addEventListener("click", function() {
  undo(player1.att === 1 ? player2 : player1);
})

startButton.addEventListener("click", function () {
  screenChange();
  makeBoard();
  setPlayerFigure (player1);
  setPlayerFigure (player2);
  bingo();
  if(firstAtt.value === "random"){
    getNumber();
  } else if (firstAtt.value === "Player1") {
    player1.att = 1;
    player2.att = 0;
    player1.resetAtt = 1;
    player2.resetAtt = 0;
    rightArrow.style.display = "none";
    leftArrow.style.display = "block";
  } else if (firstAtt.value === "Player2") {
    player2.att = 1;
    player1.att = 0;
    player1.resetAtt = 1;
    player2.resetAtt = 0;
    rightArrow.style.display = "block";
    leftArrow.style.display = "none";
  }
});

historyBack.addEventListener("click", function () {
  screenChange();
  success = [];
  undoBtn.innerHTML = `${player1.undo} - 무르기 - ${player2.undo}`;
  openRestartBtn.classList.add("z-index");
  removeIcon();
});

restartBtn.addEventListener("click", function() {
  restart();
});

lineCountUp.addEventListener("click", function () {
  countUp(lineCount);
});

lineCountDown.addEventListener("click", function () {
  countDown(lineCount);
});

gameOptionUp.addEventListener("click", function () {
  countUp(gameCount);
});

gameOptionDown.addEventListener("click", function () {
  countDown(gameCount);
});

boardColor1.addEventListener("click", function (e) {
  if(Number(e.target.getAttribute("class").split('').pop()) === player2.color){
    alert('다른 색상을 골라주세요');
    return;
  }
  if ((e.target.getAttribute("class").split('').pop()) === 'r') {
    return;
  };
  if (e.target.className === "player-board-color"){
    return;
  };
  for (let i = 0; i < (boardColor1.children).length; i++) {
    boardColor1.children[i].classList.remove("makeBorder");
  };
  if (player1.color != Number(e.target.getAttribute("class").split('').pop())){
    player1.color = Number(e.target.getAttribute("class").split('').pop());
    e.target.classList.add("makeBorder");
  };
});
boardColor2.addEventListener("click", function (e) {
  if(Number(e.target.getAttribute("class").split('').pop()) === player1.color){
    alert('다른 색상을 골라주세요');
    return;
  };
  if ((e.target.getAttribute("class").split('').pop())=== 'r') {
      return;
  };
  if (e.target.className === "player-board-color2"){
      return;
  };
  for (let i = 0; i < (boardColor2.children).length; i++) {
    boardColor2.children[i].classList.remove("makeBorder");
  };
  if (player2.color != Number(e.target.getAttribute("class").split('').pop())){
    player2.color = Number(e.target.getAttribute("class").split('').pop());
    e.target.classList.add("makeBorder");
  };
});
boardFigure1.addEventListener("click", function(e){
  let figureIndex = '';
  if(e.target.classList.contains("fa-4x")){
    figureIndex = Number(e.target.parentElement.className[7]);
  };
  if(!e.target.classList.contains("fa-4x")){
    figureIndex = Number(e.target.className[7]);
  };
  if(figureIndex === player2.figure){
    alert('다른 캐릭터를 선택해 주세요.');
    return ;
  };
  if(e.target.className === "player-board-figure1"){
    return;
  };
  for(let i = 0; i < boardFigure1.children.length; i++){
    boardFigure1.children[i].classList.remove("makeBorder");
  };
  if(e.target.classList.contains("fa-4x")){
    player1.figure = Number(e.target.parentElement.className[7])
    e.target.parentElement.classList.add("makeBorder");
  };
  if(!e.target.classList.contains("fa-4x")){
    player1.figure = Number(e.target.className[7]);
    e.target.classList.add("makeBorder");
  };
});

boardFigure2.addEventListener("click", function(e){
  let figureIndex;
  if(e.target.classList.contains("fa-4x")){
    figureIndex = Number(e.target.parentElement.className[7]);
  };
  if(!e.target.classList.contains("fa-4x")){
    figureIndex = Number(e.target.className[7]);
  };
  if(figureIndex === player1.figure){
    alert('다른 캐릭터를 선택해 주세요.');
    return ;
  };
  if(e.target.className === "player-board-figure2"){
    return;
  };
  for(let i = 0; i < boardFigure2.children.length; i++){
    boardFigure2.children[i].classList.remove("makeBorder");
  };
  if(e.target.classList.contains("fa-4x")){
    player2.figure = Number(e.target.parentElement.className[7]);
    e.target.parentElement.classList.add("makeBorder");
  };
  if(!e.target.classList.contains("fa-4x")){
    player2.figure = Number(figureIndex);
    e.target.classList.add("makeBorder");
  };
});

gameBoard.addEventListener("click", function (e) {
  let checkValue;
  if(e.target.classList.contains("fa-4x")){
    checkValue = Number(e.target.parentElement.getAttribute("value"));
  }
  if(!e.target.classList.contains("fa-4x")){
    checkValue = Number(e.target.getAttribute("value"));
  }
  for(let i = 0; i < player1.check.length; i++){
    if(player1.check[i] === checkValue){
      alert("다른곳을 선택해주세요.");
      return;
    }
  }
  let charactor1 = "";
  let charactor2 = "";
  let color1 = "";
  let color2 = "";

  if (player1.figure === 1){
    charactor1 += "x";
  } else if (player1.figure === 2){
    charactor1 += "o";
  } else if(player1.figure === 3){
    charactor1 += "moon";
  } else {
    charactor1 += "kiwi-bird";
  };

  if (player2.figure === 1){
    charactor2 += "x";
  } else if (player2.figure === 2){
    charactor2 += "o";
  } else if(player2.figure === 3){
    charactor2 += "moon";
  } else {
    charactor2 += "kiwi-bird";
  };

  if (player1.color === 1){
    color1 += "#CB997E";
  } else if (player1.color === 2){
    color1 += "#BEDEE8";
  } else if (player1.color === 3){
    color1 += "#ACBC83";
  } else if (player1.color === 4){
    color1 += "#FAD1DE";
  };

  if (player2.color === 1){
    color2 += "#CB997E";
  } else if (player2.color === 2){
    color2 += "#BEDEE8";
  } else if (player2.color === 3){
    color2 += "#ACBC83";
  } else if (player2.color === 4){
    color2 += "#FAD1DE";
  };

  if (e.target.getAttribute("class") === "game-board") {
    alert("칸을 정확히 눌러주세요!");
    return; //(칸 밖에 누르면 null나와서 패스 용) 으로 했다가 alert 넣었더니 0나와서 바꿈.
  } else {
    if (player1.att === 1) {
      // 플레이어 1이 클릭시
      if (player1.check.includes(checkValue) === true || player2.check.includes(checkValue) === true ){
        alert("이미 선택한 칸입니다.")
        return;
      } else if(player1.check.includes(checkValue) === false && player2.check.includes(checkValue) === false ){
        // 클릭한 수가 클릭이 가능할때
        gameBoard.children[checkValue].innerHTML = `<i class="fa-solid fa-4x fa-${charactor1}" style="color: ${color1}"></i>`
        player1.check.push(checkValue);
        getWinner(player1)
        changeTurn ();
      };
    } else if(player2.att === 1) {
      if (player1.check.includes(checkValue) === true || player2.check.includes(checkValue) === true ){
        alert("이미 선택한 칸입니다.")
        return;
      } else if(player1.check.includes(checkValue) === false && player2.check.includes(checkValue) === false ){
        player2.check.push(checkValue);
        gameBoard.children[checkValue].innerHTML = `<i class="fa-solid fa-4x fa-${charactor2}" style="color: ${color2}"></i>`;
        getWinner(player2);
        changeTurn ();
      };
    };
  };
});
function setPlayerFigure (player)  {
  if (player === player1) {
    if (player.figure === 1){
      infoFigure1.children[0].classList.add("fa-x");
    } else if (player.figure === 2) {
      infoFigure1.children[0].classList.add("fa-o");
    } else if (player.figure === 3) {
      infoFigure1.children[0].classList.add("fa-moon");
    } else if (player.figure === 4) {
      infoFigure1.children[0].classList.add("fa-kiwi-bird");
    };
  } else {
    if (player.figure === 1){
     infoFigure2.children[0].classList.add("fa-x");
    } else if (player.figure === 2) {
      infoFigure2.children[0].classList.add("fa-o");
    } else if (player.figure === 3) {
      infoFigure2.children[0].classList.add("fa-moon");
    } else if (player.figure === 4) {
      infoFigure2.children[0].classList.add("fa-kiwi-bird");
    };
  };
};

function screenChange () {
  const setLine = Number(lineCount.innerText);
  const gameBoard = document.getElementById("game-board");
  if(window.getComputedStyle(screen1).display === "flex"){
    screen1.style.setProperty("display", "none");
    screen2.style.setProperty("display", "flex");
    gameBoard.style.gridTemplateColumns = `repeat(${setLine}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${setLine}, 1fr)`;
  } else {
    screen1.style.setProperty("display", "flex");
    screen2.style.setProperty("display", "none");
    resetBoard();
  };
};
function countUp (e) {
  const setLine = Number(lineCount.innerText);
  if(e.id === "game-win-count") {
    if (Number(e.innerText) < setLine) {
      e.innerHTML = (Number(e.innerText) + 1).toString();
      return Number(e.innerText);
    } else {
      alert("라인보다 높게 설정할 수 없습니다.");
      return Number(e.innerText);
    };
  } else {
    if (Number(e.innerText) < 9) {
      e.innerHTML = (Number(e.innerText) + 1).toString();
      return Number(e.innerText);
    } else {
      alert("라인은 9칸까지 가능합니다.");
      return Number(e.innerText);
    };
  };
};

function countDown (e) {
  if(e.id === "game-win-count") {
    if (Number(e.innerText) > 3) {
      e.innerHTML = (Number(e.innerText) - 1).toString();
      return Number(e.innerText);
    } else {
      alert("승리 조건이 3보다 작을 순 없습니다.");
      return Number(e.innerText);
    };
  } else {
    if(Number(e.innerText) > 3){
      e.innerHTML = (Number(e.innerText) - 1).toString();
      return (Number(e.innerText)-1);
    } else {
      alert("라인은 3칸 이하는 불가능합니다.");
      return Number(e.innerText);
    };
  };
};

function arrowturn() {
  if(window.getComputedStyle(leftArrow).display === "block"){
    rightArrow.style.display = "block";
    leftArrow.style.display = "none";
  } else {
    rightArrow.style.display = "none";
    leftArrow.style.display = "block";
  };
};

function makeBoard () {
  const setLine = Number(lineCount.innerText);
  const gameBoard = document.getElementById("game-board");
  for(let i = 0; i < setLine**2; i++ ){
    let newDiv = document.createElement("div");
    newDiv.style.borderStyle = "solid";
    newDiv.style.borderWidth = "3px";
    newDiv.style.borderColor = "#F7B5A2";
    newDiv.style.borderRadius = "0.5rem";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.minWidth = "62px";
    newDiv.style.minHeight = "62px";
    newDiv.setAttribute("value", `${i}`);
    gameBoard.appendChild(newDiv);
  };
};

function resetBoard () {
  const gameBoard = document.getElementById("game-board");
  while(gameBoard.children.length > 0){
    resetPlayer();
    gameBoard.children[0].remove();
  };
};

function changeTurn () {
  if (player1.att === 1) {
    player1.att = 0;
    player2.att = 1;
    arrowturn();
  } else if (player2.att === 1) {
    player1.att = 1;
    player2.att = 0;
    arrowturn();
  };
};

function bingo () {
  const setLine = Number(lineCount.innerText);
  let line = setLine;
  let win = Number(gameCount.innerText);
  let collect = [];
  for(let i = line-1; i > win-2; i--){
  let answer = [];
  for(let j = i;;){
    answer.push(j);
    j += line-1
    if(answer.length === win){
      break;
    };
  };
  collect.push(answer);
  };
  if(line !== win ){
    for(let i = 0; i < (line-win+1)**2; i++){
      let answer = []
      for(let j = 0; j < collect[i].length; j++){
        answer.push(collect[i][j]+(line*1))
      }
      collect.push(answer)
      if(collect.length >= (line-win+1)**2){
        break;
      };
    };
  };
  for(let i of collect){
    success.push(i);
  };
  collect = [];
  for(let i = 0; i < line; i++){
    let answer = [];
    for(let j = i;;){
      answer.push(j);
      j += line;
      if(answer.length === win){
        break;
      };
    };
    collect.push(answer);
    answer = [];
  };
  if(line !== win ){
    for(let i = 0; i < (line-win+1)*line; i++){
      let answer = [];
      for(let j = 0; j < collect[i].length; j++){
        answer.push(collect[i][j]+(line*1));
      };
      collect.push(answer);
      if(collect.length >= (line-win+1)*line){
        break;
      };
    };
  };
  for(let i of collect){
    success.push(i);
  };
  collect = [];
  for(let i = 0; i < line-win+1; i++){
    let answer = [];
    for(let j = i;;){
      answer.push(j);
      j ++
      if(answer.length === win){
        break;
      };
    };
    collect.push(answer);
    answer = [];
  };
  for(let i = 0; i < (line-win+1)*line; i++){
    let answer = [];
    for(let j = 0; j < collect[i].length; j++){
      answer.push(collect[i][j]+(line*1));
    };
    collect.push(answer);
    if(collect.length >= (line-win+1)*line){
      break;
    };
  };
  for(let i of collect){
    success.push(i);
  };
  collect = [];
  for(let i = 0; i < line-win+1; i++){
    let answer = [];
    for(let j = i;;){
      answer.push(j);
      j += line+1
      if(answer.length === win){
        break;
      };
    };
    collect.push(answer);
    answer = [];
  };
  if(line !== win ){
    for(let i = 0; i < (line-win+1)**2; i++){
      let answer = []
      for(let j = 0; j < collect[i].length; j++){
        answer.push(collect[i][j]+(line*1));
      };
      collect.push(answer);
      if(collect.length >= (line-win+1)**2){
        break;
      };
    };
  };
  for(let i of collect){
    success.push(i);
  };
};

function getWinner (player) {
  const setLine = Number(lineCount.innerText);
    for (let i = 0; i < success.length; i++){
      for(let j = 0; j < success[i].length; j++){
        if(!player.check.includes(success[i][j])){
            break;
        };
        if(player.check.includes(success[i][j]) && j === success[i].length-1 && drawGame.check) {
          drawGame.check = false;
          openRestartBtn.classList.remove("z-index");
          setTimeout(function(){
            alert(`${player.name}님이 이겼습니다!`);
            success = [];
          }, 5);
          break;
        }; 
      };
    };
  if(player1.check.length + player2.check.length === setLine**2 && drawGame.check){
    openRestartBtn.classList.remove("z-index");
    setTimeout(function() {
      alert("비겼습니다! 다시 시작해주세요!");
    }, 5);
    drawGame.check = true;
  };
};

function getNumber() {
  let randomNum = (Math.floor(Math.random() * (3 - 1)));
  if(randomNum === 0){
    player1.att = 1;
    player2.att = 0;
    player1.resetAtt = 1;
    player2.resetAtt = 0;
    rightArrow.style.display = "none";
    leftArrow.style.display = "block";
  } else {
    player2.att = 1;
    player1.att = 0;
    player2.resetAtt = 1;
    player1.resetAtt = 0;
    rightArrow.style.display = "block";
    leftArrow.style.display = "none";
  };
};

function resetPlayer (){
  player1.check=[];
  player1.undo = 3;
  player1.figure = 1;
  player1.color = 1;
  player2.check=[];
  player2.undo = 3;
  player2.figure = 2;
  player2.color = 2;
  drawGame.check = true;
  openRestartBtn.classList.add("z-index");
  undoBtn.innerHTML = `${player1.undo} - 무르기 - ${player2.undo}`;
  for (let i = 0; i < (boardFigure1.children).length; i++) {
    boardFigure1.children[i].classList.remove("makeBorder");
    boardColor1.children[i].classList.remove("makeBorder");
    boardFigure2.children[i].classList.remove("makeBorder");
    boardColor2.children[i].classList.remove("makeBorder");
  };
  boardFigure1.children[0].classList.add("makeBorder");
  boardFigure2.children[1].classList.add("makeBorder");
  boardColor1.children[0].classList.add("makeBorder");
  boardColor2.children[1].classList.add("makeBorder");
};

function removeIcon(){
  if (infoFigure1.children[0].classList.contains("fa-x")){
    infoFigure1.children[0].classList.remove("fa-x");
  } else if (infoFigure1.children[0].classList.contains("fa-o")) {
    infoFigure1.children[0].classList.remove("fa-o");
  } else if (infoFigure1.children[0].classList.contains("fa-moon")) {
    infoFigure1.children[0].classList.remove("fa-moon");
  } else if (infoFigure1.children[0].classList.contains("fa-kiwi-bird")) {
    infoFigure1.children[0].classList.remove("fa-kiwi-bird");
  };
  if (infoFigure2.children[0].classList.contains("fa-x")){
    infoFigure2.children[0].classList.remove("fa-x");
  } else if (infoFigure2.children[0].classList.contains("fa-o")) {
    infoFigure2.children[0].classList.remove("fa-o");
  } else if (infoFigure2.children[0].classList.contains("fa-moon")) {
    infoFigure2.children[0].classList.remove("fa-moon");
  } else if (infoFigure2.children[0].classList.contains("fa-kiwi-bird")) {
    infoFigure2.children[0].classList.remove("fa-kiwi-bird");
  };
};

function restart (){
  bingo();
  player1.check=[];
  player2.check=[];
  player1.undo = 3;
  player2.undo = 3;
  player1.att = player1.resetAtt;
  player2.att = player2.resetAtt;
  openRestartBtn.classList.add("z-index");
  drawGame.check = true;
  if (player1.att === 1) {
    rightArrow.style.display = "none";
    leftArrow.style.display = "block";
  } else if (player2.att === 1) {
    rightArrow.style.display = "block";
    leftArrow.style.display = "none";
  };
  while(gameBoard.children.length > 0){
    gameBoard.children[0].remove();
  };
  undoBtn.innerHTML = `${player1.undo} - 무르기 - ${player2.undo}`;
  makeBoard();
};

function undo (player) {
  if (player.undo === 0) {
      return;
  };
  if (player.att === 1){
      return;
  };
  const lastIndex = Number(player.check.pop());
  if (gameBoard.children[lastIndex].children[0].classList.contains("fa-x")){
    gameBoard.children[lastIndex].children[0].classList.remove("fa-x");
  } else if (gameBoard.children[lastIndex].children[0].classList.contains("fa-o")) {
    gameBoard.children[lastIndex].children[0].classList.remove("fa-o");
  } else if (gameBoard.children[lastIndex].children[0].classList.contains("fa-moon")) {
    gameBoard.children[lastIndex].children[0].classList.remove("fa-moon");
  } else if (gameBoard.children[lastIndex].children[0].classList.contains("fa-kiwi-bird")) {
    gameBoard.children[lastIndex].children[0].classList.remove("fa-kiwi-bird");
  };
  player.undo--;
  if(player1.att === 0){
    player1.att = 1;
    player2.att = 0;
  } else {
    player2.att = 1;
    player1.att = 0;
  };
  undoBtn.innerHTML = `${player1.undo} - 무르기 - ${player2.undo}`;
  arrowturn();
};