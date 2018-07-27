/**
 * @author Frank Dip
 */

/** ***********************************************************************
 * Model
 **************************************************************************/

/** ***********************************************************************
 * DOM
 **************************************************************************/
const stars = document.getElementById("stars");
const moves = document.getElementById("moves");
const restart = document.getElementById("restart");
const timer = document.getElementById("timer");
const deckUL = document.querySelector(".deck");
const congratsBtn = document.getElementById("congrats-btn");

/** ***********************************************************************
 * Variables
 **************************************************************************/
// Array of strings that are the cards.
const cardList = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];

const holder = []; // Holds the clicked card.
let matched = 0; // Counts the matched cards.
let movesCount = 0; // Counts the moves done.
let secs = 0; // The seconds of the timer.
let totalTime = 0; // The total time.

/** ***********************************************************************
 * Controller like code
 **************************************************************************/
createStars();
shuffle(cardList);
createCards(cardList);

/**
 * @desc Starts the timer
 */
totalTime = setInterval(() => {
  timer.innerText = secs++;;
}, 1000);

/**
 * @desc Restart click listerner
 * Restarts the game after clicking the restart button.
 */
restart.addEventListener("click", () => {
  matched = 0;
  movesCount = 0;
  secs = 0;
  clearInterval(totalTime);
  totalTime = setInterval(() => {
    timer.innerText = secs++;;
  }, 1000);
  shuffle(cardList);
  createCards(cardList);
  createStars();
  moves.innerText = movesCount;
  timer.innerText = secs;
});

/**
 * @desc Card click listener
 */
deckUL.addEventListener("click", function(event) {
  // Prevents the rest of the code from running, after winning.
  if (matched === 8) {
    clearInterval(totalTime);
    congratsBtn.click();
    return;
  }

  // Moves counter and updateer
  movesCount++;
  moves.innerText = movesCount;

  // Star rating updater
  if (movesCount === 16 || movesCount === 26) {
    stars.removeChild(stars.childNodes[1]);
  }

  /**
   * @desc Updates the cards
   */
  if (
    event.target.nodeName.toLowerCase() === "li" &&
    event.target.classList[1] !== "match"
  ) {
    /**
     * @desc The first card clicked
     */
    toggleCardOpenShow(event.target);
    if (holder.length === 0) {
      holder.push(event.target);
    } else if (holder.length === 1 && holder[0] !== event.target) {
      /**
       * @desc Matching cards code
       */
      if (holder[0].firstChild.classList[1] === event.target.firstChild.classList[1]) {
        toggleCardOpenShow(holder[0]);
        holder[0].classList.add("match");
        toggleCardOpenShow(event.target);
        event.target.classList.add("match");
        holder.pop();
        matched++;
        clearInterval(totalTime);
        if (matched === 8) {congratsBtn.click();}
      } else if (holder[0].firstChild.classList[1] !== event.target.firstChild.classList[1]) {
        /**
         * @desc The else if statement for not matching cards
         */
        toggleCardOpenIncorrect(holder[0]);
        toggleCardOpenIncorrect(event.target);
        setTimeout(() => {
          toggleCardOpenIncorrect(holder[0]);
          toggleCardOpenIncorrect(event.target);
          toggleCardOpenShow(holder[0]);
          toggleCardOpenShow(event.target);
          holder.pop();
        }, 300);
      }
    }
  }
});

/** ***********************************************************************
 * Functions
 **************************************************************************/

/**
 * @desc Shuffle function
 * Shuffle function from http://stackoverflow.com/a/2450976
 * @param {array} array Takes an array and shuffles it.
 * @return {array} Returns an array.
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * @desc creates the cards
 * @param {array} obj Takes an array of strings.
 */
function createCards(obj) {
  deckUL.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < obj.length; i++) {
    const li = document.createElement("li");
    const iCard = document.createElement("i");
    li.classList.add("card");
    li.appendChild(iCard);
    iCard.classList.add("fa");
    iCard.classList.add(obj[i]);
    fragment.appendChild(li);
  }
  deckUL.appendChild(fragment);
}

/**
 * @desc Toggles the obj's classes for open and show
 * @param {DOM object} obj The card to be targeted
 */
function toggleCardOpenShow(obj) {
  obj.classList.toggle("open");
  obj.classList.toggle("show");
}

/**
 * @desc Toggles the obj's class for incorrect
 * @param {DOM object} obj The card to be targeted
 */
function toggleCardOpenIncorrect(obj) {
  obj.classList.toggle("incorrect");
}

/**
 * @desc Creates the stars.
 */
function createStars() {
  stars.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    const li = document.createElement("li");
    const iStar = document.createElement("i");
    li.appendChild(iStar);
    iStar.classList.add("fa");
    iStar.classList.add("fa-star");
    fragment.appendChild(li);
  }
  stars.appendChild(fragment);
}
