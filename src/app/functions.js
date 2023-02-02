let container = document.querySelector("#_cont");
let cells = document.querySelectorAll(".cell");
let timer = document.querySelector(
  ".progress-container > progress.nes-progress"
);

let solved = [];

let data = [];

let wordsToSolve = [
  "ALASKA",
  "FIFTY",
  "YELLOWSTONE",
  "BALDEAGLE",
  "MCKINLEY",
  "WASHINGTON",
  "NIAGARA",
  "CHICAGO",
  "MEXICO",
  "TORNADO",
];

let currentlySelectedQuestionNumber = 5;

function coordinatesToCellNumber(x, y) {
  return (y / 6.25) * 16 + x / 6.25;
}

function cellNumberToX(cellNumber) {
  return (cellNumber % 16) * 6.25;
}

function cellNumberToY(cellNumber) {
  return Math.trunc(cellNumber / 16) * 6.25;
}

function marginLeft(block) {
  return Number(block.style.marginLeft.split("%")[0]);
}

function marginTop(block) {
  return Number(block.style.marginTop.split("%")[0]);
}

function invertDirection(direction) {
  return direction == "horizontal" ? "vertical" : "horizontal";
}

function blocks() {
  return document.querySelectorAll(".block");
}

function getBlocksAtCellNumber(cellNumber) {
  let blocksFound = [];
  blocks().forEach((block) => {
    if (
      marginLeft(block) == cellNumberToX(cellNumber) &&
      marginTop(block) == cellNumberToY(cellNumber)
    ) {
      blocksFound.push(block);
    }
  });
  return blocksFound;
}

function placeWord(word, number, direction, xCoordinate, yCoordinate) {
  let html = "";
  let occupiedCells = [];
  let cellNumber = coordinatesToCellNumber(xCoordinate, yCoordinate);

  for (let i = 0; i < word.length; i++) {
    occupiedCells.push(
      direction == "horizontal" ? cellNumber + i : cellNumber + i * 16
    );
    let style = `margin-left:${
      direction == "horizontal" ? xCoordinate + i * 6.25 : xCoordinate
    }%; margin-top:${
      direction == "vertical" ? yCoordinate + i * 6.25 : yCoordinate
    }%; `;

    if (i == 0) {
      html += `<div class="block" style="${style}">
                <span style="transform: scale(0);">${word[i]}</span>
                <span>${number}</span>
             </div>`;
    } else {
      html += `<div class="block" style="${style}">
                <span style="transform: scale(0);">${word[i]}</span>
             </div>`;
    }
  }

  container.insertAdjacentHTML("beforeend", html);

  data.push({ qnum: number, occupied: occupiedCells });

  return occupiedCells;
}

// Load table
// play function
window.addEventListener("load", () => {
  cells.forEach((cell) => (cell.style.opacity = "0"));

  placeWord("ALASKA", 1, "vertical", 18.75, 0);
  placeWord("YELLOWSTONE", 3, "vertical", 37.5, 6.25);
  placeWord("FIFTY", 2, "vertical", 50, 0);
  placeWord("BALDEAGLE", 4, "vertical", 62.5, 6.25);
  placeWord("CHICAGO", 8, "vertical", 50, 56.25);
  placeWord("MCKINLEY", 5, "horizontal", 6.25, 25);
  placeWord("WASHINGTON", 6, "horizontal", 25, 43.75);
  placeWord("NIAGARA", 7, "vertical", 81.25, 43.75);
  placeWord("MEXICO", 9, "horizontal", 31.25, 68.75);
  placeWord("TORNADO", 10, "horizontal", 25, 81.25);
});

// play function
const timerInterval = setInterval(() => {
  if (timer.value == 0) {
    console.log("game has ended");
    clearInterval(timerInterval);
  } else if (timer.value > 0 && timer.value <= 10) {
    // change music here
    timer.classList.remove("is-warning");
    timer.classList.add("is-error");
  } else if (timer.value > 10 && timer.value <= 30) {
    timer.classList.add("is-warning");
  }

  timer.value -= 1;
}, 200);

function bindQuestionCardEvents() {
  let questionCards = document.querySelectorAll(".question-card");
  let everyCardIsSolved = true;
  // check if game has ended
  questionCards.forEach((card) => {
    everyCardIsSolved =
      everyCardIsSolved &&
      solved.includes(Math.floor(card.querySelector(".title").textContent));
  });
  if (everyCardIsSolved) {
    console.log("You have won");
    return;
  }

  // if the currentlySelectedQuestionNumber is not available find the one whom is available
  for (
    let i = 0;
    i < questionCards.length || currentlySelectedQuestionNumber == null;
    i++
  ) {
    let card = questionCards[i];
    let questionCardNumber = Math.floor(
      card.querySelector(".title").textContent
    );
    if (
      !solved.includes(questionCardNumber) &&
      currentlySelectedQuestionNumber == null
    ) {
      currentlySelectedQuestionNumber = questionCardNumber;
      document.querySelector("#cell-number").innerHTML =
        currentlySelectedQuestionNumber;
      card.classList.add("active");
      console.log("scroll");
      card.scrollIntoView(false);
    }
  }

  questionCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.classList.contains("active")) {
        if (e.target.classList.contains("cleared")) {
          return null;
        } else {
          // remove previous active element
          document
            .querySelector(".question-card.active")
            .classList.remove("active");

          // new active element
          e.target.classList.add("active");

          // change indicated selected number in input label
          currentlySelectedQuestionNumber = Math.floor(
            e.target.querySelector(".title").textContent
          );

          document.querySelector("#cell-number").innerHTML =
            currentlySelectedQuestionNumber;
        }
      }
    });
  });
}
// play function
// Select question to answer
bindQuestionCardEvents();

// Submit event
document.querySelector("#enter-btn").addEventListener("click", (e) => {
  let textInput = document.querySelector("#guess-text").value.trim();

  if (
    textInput != wordsToSolve[currentlySelectedQuestionNumber - 1] ||
    textInput === ""
  ) {
    // show failed input animation
    document.querySelector("#guess-text").classList.add("is-error");
    setTimeout(() => {
      document.querySelector("#guess-text").classList.remove("is-error");
      document.querySelector("#guess-text").value = "";
    }, 200);
  } else if (textInput == wordsToSolve[currentlySelectedQuestionNumber - 1]) {
    // show successful input animation
    document.querySelector("#guess-text").classList.add("is-success");
    setTimeout(() => {
      document.querySelector("#guess-text").classList.remove("is-success");
      document.querySelector("#guess-text").value = "";
    }, 400);

    // clear the question card
    let activeQuestionCard = document.querySelector(".question-card.active");
    activeQuestionCard.classList.add("cleared");
    activeQuestionCard.querySelector("a.nes-btn").classList.add("is-disabled");
    activeQuestionCard.insertAdjacentHTML(
      "beforeend",
      `
                <div class="cleared-indicator-area">
                  <div class="cleared-img-placeholder"></div>
                </div>
      `
    );
    activeQuestionCard.classList.remove("active");
    // show answer to the table and save data
    data.forEach((object) => {
      if (object.qnum == currentlySelectedQuestionNumber) {
        object.occupied.forEach((cellNumber) => {
          let blocksArray = getBlocksAtCellNumber(cellNumber);
          if (blocksArray.length == 1) {
            let letter = blocksArray[0].querySelector("span:nth-of-type(1)");
            letter == null
              ? (blocksArray[0].querySelector("span").style.transform =
                  "scale(1)")
              : (letter.style.transform = "scale(1)");
          } else if (blocksArray.length == 2) {
            blocksArray[0].querySelector("span").style.transform = "scale(1)";
            blocksArray[1].querySelector("span").style.transform = "scale(1)";
          }
        });
      }
    });
    solved.push(currentlySelectedQuestionNumber);

    // make the next question active
    currentlySelectedQuestionNumber = null;
    bindQuestionCardEvents();
  }
});

// Hint event
let hintButtons = document.querySelectorAll(
  ".question-card > a.nes-btn-custom"
);

hintButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target);
  });
});
