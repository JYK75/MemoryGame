document.addEventListener('DOMContentLoaded', () => {
  
  // card options
  const cardArray = [
    {
      name: 'fox',
      img: 'images/fox.png'
    },
    {
      name: 'alpaca',
      img: 'images/alpaca.png'
    },
    {
      name: 'crocodile',
      img: 'images/crocodile.png'
    },
    {
      name: 'elephant',
      img: 'images/elephant.png'
    },
    {
      name: 'flamingo',
      img: 'images/flamingo.png'
    },
    {
      name: 'giraffe',
      img: 'images/giraffe.png'
    },
    {
      name: 'lion',
      img: 'images/lion.png'
    },
    {
      name: 'pig',
      img: 'images/pig.png'
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // create
  function createBoard() {
    for(let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('img');
      card.setAttribute('src', 'images/question.png');
      card.classList.add('card');
      card.setAttribute('data-id', i);
      card.addEventListener('click', filpCard)
      grid.appendChild(card)
    }
  }

  //check
  const checkForMatch = () => {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if(cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match');
      cards[optionOneId].setAttribute('src', 'images/square.png');
      cards[optionTwoId].setAttribute('src', 'images/square.png');
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', 'images/question.png');
      cards[optionTwoId].setAttribute('src', 'images/question.png');
      alert('try again');
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if(cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Congratulations!'
    }
  }

  //filp card
  const filpCard = (e) => {
    let cardId = e.target.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId);
    e.target.setAttribute('src', cardArray[cardId].img)
    if(cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
  
  createBoard();
})