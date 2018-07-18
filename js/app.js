const deckUL = document.querySelector(".deck");

/*
 * Create a list that holds all of your cards
 */
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cardList);
createCards(cardList);
function createCards(obj) {
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

// Shuffle function from http://stackoverflow.com/a/2450976
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const holder = [];
deckUL.addEventListener("click", function(event) {
  if (event.target.nodeName.toLowerCase() === "li") {
    toggleCardOpenShow(event.target);
    if (holder.length === 0) {
      holder.push(event.target);
    } else if (
      holder.length === 1 &&
      holder[0] !== event.target
    ) {
      if (holder[0].firstChild.classList[1] === event.target.firstChild.classList[1]) {
        toggleCardOpenShow(holder[0]);
        holder[0].classList.add("match");
        toggleCardOpenShow(event.target);
        event.target.classList.add("match");
        holder.pop();
      } else if (holder[0].firstChild.classList[1] !== event.target.firstChild.classList[1]) {
        toggleCardOpenIncorrect(holder[0]);
        toggleCardOpenIncorrect(event.target);
        setTimeout(() => {
          toggleCardOpenIncorrect(holder[0]);
          toggleCardOpenIncorrect(event.target);
          toggleCardOpenShow(holder[0]);
          toggleCardOpenShow(event.target);
          holder.pop();
        }, 500);
      }
    }
  }
});

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
