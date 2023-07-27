import words from "./words.json" assert { type: "json" };

const keys = document.querySelectorAll("button");
let correctGuesses = [];
let misses = 0;

const clickButton = (e) => {
  let key = e.target.getAttribute("id");

  if (key === "play-btn") {
    const keyboard = document.querySelectorAll(".key");
    keyboard.forEach(function (key) {
      key.setAttribute("style", "background-color: white;");
    });
    misses = 0;
    correctGuesses = [];
    getWord();
  } else {
    checkLetter(key);
  }
};

keys.forEach(function (key) {
  key.addEventListener("click", clickButton);
});

const getWord = () => {
  const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
  console.log(word);
  localStorage.setItem("word", word);
};

const displayLetter = (letter, arrOfIndices) => {
  console.log(letter);
  console.log(arrOfIndices);

  for (let i = 0; i < arrOfIndices.length; i++) {
    correctGuesses.push({
      index: "letter" + arrOfIndices[i],
      letter: letter,
    });
  }

  if (correctGuesses.length === 8) {
    console.log("YOU WIN!");
  } else {
    console.log(correctGuesses);
  }
};

const addStick = () => {
  if (misses > 6) {
    console.log("YOU LOSE!");
    // display word
  } else {
    misses++;
    console.log(misses);
  }
};

const checkLetter = (key) => {
  const word = localStorage.getItem("word");
  const letter = document.getElementById(key);
  const indices = [];

  for (let i = 0; i < word.length; i++) {
    if (word[i] === key) {
      indices.push(i);
    }
  }

  if (indices.length === 0) {
    letter.setAttribute("style", "background-color: gray;");
    addStick();
  } else {
    letter.setAttribute("style", "background-color: lightgreen;");
    displayLetter(key, indices);
  }
};

// lose game when misses.length === 8
// win game when correctGuesses.length === 8
// can only click a key once
// display key(s) in their correct position in word
// add sticks to figure for incorrect letters
// disable keyboard if new game not clicked and/or clear local word on reload
// save stats in localstorage
