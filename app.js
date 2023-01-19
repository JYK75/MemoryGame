document.addEventListener('DOMContentLoaded', () => {
  /*
todo : 게임 state 관리 
*/


  // card Data
  const cardData = [
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
  
  let cardArray = [];

  // btn-controll
  let btnArray = document.querySelectorAll('.count-btn');
  let reset = document.querySelector('#reset');
  for(let i = 0; i < btnArray.length; i++) {
    btnArray[i].addEventListener('click', () => {
      document.querySelector('.active').classList.remove('active');
      btnArray[i].classList.add('active');
      resetCards();
      createBoard();
    })
  }
  reset.addEventListener('click', () => {
    resetCards();
    createBoard();
  })

  // reset cards 
  const resetCards = () => {
    cardsWon = [];
    cardArray = [];
    grid.innerHTML = '';
  }

  // create cards && shuffle
  const cardShuffle = () => {
    let count = document.querySelector('.active').getAttribute('data-id');
  
    cardData.sort(() => 0.5 - Math.random());
    let temp = cardData.slice(0, count);
    for(let i = 0; i < temp.length; i++) {
      cardArray.push(temp[i]);
    }
    temp.sort(() => 0.5 - Math.random());
    for(let i = 0; i < temp.length; i++) {
      cardArray.push(temp[i]);
    }
  }

  // create board

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function createBoard() {
    cardShuffle();
    resultDisplay.textContent = cardsWon.length;
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
      cards[optionOneId].classList.add('check');
      cards[optionTwoId].classList.add('check');
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
      setTimeout(checkForMatch, 200);
    }
  }
  
  createBoard();
})