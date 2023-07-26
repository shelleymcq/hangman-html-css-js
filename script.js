import words from "./words.json" assert { type: "json" };

const keys = document.querySelectorAll("button");

const clickButton = (e) => {
  let key = e.target.getAttribute("id");

  if (key === "play-btn") {
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

const checkLetter = (key) => {
  const word = localStorage.getItem("word");
  const letter = document.getElementById(key);
  const indices = [];

  for (let i = 0; i < word.length; i++) {
    if (word[i] === key) {
      indices.push(i);
    }
  }

  console.log(key, word);
  console.log(indices);

  if (indices.length > 0) {
    letter.setAttribute("style", "background-color: lightgreen;");
  } else {
    letter.setAttribute("style", "background-color: gray;");
  }

  // set key to grey for selected, not in word
  // set key to green for selected, in word
  // display key(s) in their correct position in word
};

// add sticks to figure for incorrect letters
// win game
// lose game
