document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('questionModal');
  const modalTitle = document.getElementById('modalTitle');
  const questionText = document.getElementById('questionText');
  const answerInput = document.getElementById('answerInput');
  const submitAnswer = document.getElementById('submitAnswer');
  const closeModal = document.querySelector('.close');
  const playerCountInput = document.getElementById('playerCount');
  const setPlayersButton = document.getElementById('setPlayers');
  const playersNamesDiv = document.getElementById('playersNames');
  const playerNameInputsDiv = document.getElementById('playerNameInputs');
  const startGameButton = document.getElementById('startGame');
  const currentTurnElement = document.getElementById('currentTurn');
  const playersMoneyElement = document.getElementById('playersMoney');

  let totalMoney = 0;
  let players = [];
  let currentPlayerIndex = 0;

  // Check required elements
  const elements = {
    modal,
    modalTitle,
    questionText,
    answerInput,
    submitAnswer,
    closeModal,
    playerCountInput,
    setPlayersButton,
    playersNamesDiv,
    playerNameInputsDiv,
    startGameButton,
    currentTurnElement,
    playersMoneyElement
  };

  for (const [key, element] of Object.entries(elements)) {
    if (!element) {
      console.error(`The ${key} element is missing from the DOM.`);
    }
  }

  // Example JSON data embedded as a JavaScript object
  // const categories = [
  //   {
  //     "category": "World Capitals",
  //     "questions": [
  //       {
  //         "question": "This city is the capital of Japan.",
  //         "answer": "Tokyo"
  //       },
  //       {
  //         "question": "This city is the capital of Australia.",
  //         "answer": "Canberra"
  //       },
  //       {
  //         "question": "This city is the capital of Canada.",
  //         "answer": "Ottawa"
  //       },
  //       {
  //         "question": "This city is the capital of Brazil.",
  //         "answer": "Brasília"
  //       },
  //       {
  //         "question": "This city is the capital of South Korea.",
  //         "answer": "Seoul"
  //       }
  //     ]
  //   },
  //   {
  //     "category": "Mythology",
  //     "questions": [
  //       {
  //         "question": "This Greek god is known as the king of the gods.",
  //         "answer": "Zeus"
  //       },
  //       {
  //         "question": "This Norse god wields a hammer called Mjölnir.",
  //         "answer": "Thor"
  //       },
  //       {
  //         "question": "This Egyptian god is known for having the head of a falcon.",
  //         "answer": "Horus"
  //       },
  //       {
  //         "question": "This Roman goddess is equivalent to the Greek goddess Athena.",
  //         "answer": "Minerva"
  //       },
  //       {
  //         "question": "This Hindu god is known as the destroyer.",
  //         "answer": "Shiva"
  //       }
  //     ]
  //   },
  //   {
  //     "category": "Inventions",
  //     "questions": [
  //       {
  //         "question": "This inventor is credited with creating the first practical telephone.",
  //         "answer": "Alexander Graham Bell"
  //       },
  //       {
  //         "question": "This invention by Johannes Gutenberg revolutionized the printing industry.",
  //         "answer": "Printing press"
  //       },
  //       {
  //         "question": "This American inventor is known for the light bulb.",
  //         "answer": "Thomas Edison"
  //       },
  //       {
  //         "question": "This invention, created by the Wright brothers, took flight in 1903.",
  //         "answer": "Airplane"
  //       },
  //       {
  //         "question": "This scientist developed the theory of relativity.",
  //         "answer": "Albert Einstein"
  //       }
  //     ]
  //   },
  //   {
  //     "category": "Music",
  //     "questions": [
  //       {
  //         "question": "This band released the album 'Abbey Road' in 1969.",
  //         "answer": "The Beatles"
  //       },
  //       {
  //         "question": "This composer is known for his Symphony No. 5 in C Minor.",
  //         "answer": "Ludwig van Beethoven"
  //       },
  //       {
  //         "question": "This artist is known as the 'Queen of Pop'.",
  //         "answer": "Madonna"
  //       },
  //       {
  //         "question": "This classical composer wrote 'The Four Seasons'.",
  //         "answer": "Antonio Vivaldi"
  //       },
  //       {
  //         "question": "This artist's real name is Stefani Joanne Angelina Germanotta.",
  //         "answer": "Lady Gaga"
  //       }
  //     ]
  //   },
  //   {
  //     "category": "Technology",
  //     "questions": [
  //       {
  //         "question": "This company created the iPhone.",
  //         "answer": "Apple"
  //       },
  //       {
  //         "question": "This programming language is known for its snake logo.",
  //         "answer": "Python"
  //       },
  //       {
  //         "question": "This technology company was founded by Bill Gates and Paul Allen.",
  //         "answer": "Microsoft"
  //       },
  //       {
  //         "question": "This social media platform is known for its bird logo.",
  //         "answer": "Twitter"
  //       },
  //       {
  //         "question": "This search engine is known for its colorful logo and doodles.",
  //         "answer": "Google"
  //       }
  //     ]
  //   }
  // ];
  const categories = [
    {
      "category": "Biblical Capitals",
      "questions": [
        {
          "question": "This city was the capital of the ancient kingdom of Israel.",
          "answer": "Jerusalem"
        },
        {
          "question": "This city became the capital of the northern kingdom after the split of Israel.",
          "answer": "Samaria"
        },
        {
          "question": "This city is known as the birthplace of Jesus.",
          "answer": "Bethlehem"
        },
        {
          "question": "This city is where Paul the Apostle wrote many of his epistles.",
          "answer": "Rome"
        },
        {
          "question": "This city was known for its walls that fell after being encircled for seven days.",
          "answer": "Jericho"
        }
      ]
    },
    {
      "category": "Reformation Leaders",
      "questions": [
        {
          "question": "This German monk is known for initiating the Protestant Reformation.",
          "answer": "Martin Luther"
        },
        {
          "question": "This French theologian is a major figure in the Reformation and wrote 'Institutes of the Christian Religion'.",
          "answer": "John Calvin"
        },
        {
          "question": "This Scottish minister founded Presbyterianism.",
          "answer": "John Knox"
        },
        {
          "question": "This Swiss reformer is known for his work in Zurich and his disagreements with Luther.",
          "answer": "Ulrich Zwingli"
        },
        {
          "question": "This English theologian translated the Bible into English and was executed for heresy.",
          "answer": "William Tyndale"
        }
      ]
    },
    {
      "category": "Christian Doctrines",
      "questions": [
        {
          "question": "This doctrine emphasizes God's sovereignty in salvation.",
          "answer": "Predestination"
        },
        {
          "question": "This Reformed belief states that the sacraments are signs and seals of God's covenant.",
          "answer": "Covenant Theology"
        },
        {
          "question": "This doctrine teaches that Scripture alone is the supreme authority in all matters of doctrine and practice.",
          "answer": "Sola Scriptura"
        },
        {
          "question": "This doctrine teaches that Christ's atonement is limited to the elect.",
          "answer": "Limited Atonement"
        },
        {
          "question": "This concept in Reformed theology refers to God's grace that irresistibly draws the elect to salvation.",
          "answer": "Irresistible Grace"
        }
      ]
    },
    {
      "category": "Church History",
      "questions": [
        {
          "question": "This council affirmed the doctrine of the Trinity and the full divinity of the Son.",
          "answer": "Council of Nicaea"
        },
        {
          "question": "This event in 1517 is often considered the start of the Protestant Reformation.",
          "answer": "Nailing of the 95 Theses"
        },
        {
          "question": "This period was marked by intense theological debate and the emergence of Protestant denominations.",
          "answer": "The Reformation"
        },
        {
          "question": "This event in 1054 led to the split between the Eastern Orthodox and Roman Catholic Churches.",
          "answer": "The Great Schism"
        },
        {
          "question": "This 16th-century meeting aimed to address the issues raised by the Reformation and reform the Catholic Church.",
          "answer": "The Council of Trent"
        }
      ]
    },
    {
      "category": "Christian Literature",
      "questions": [
        {
          "question": "This book by John Bunyan is an allegory of the Christian life.",
          "answer": "The Pilgrim's Progress"
        },
        {
          "question": "This 16th-century book by John Calvin outlines Reformed theology.",
          "answer": "Institutes of the Christian Religion"
        },
        {
          "question": "This classic book by C.S. Lewis explores the problem of pain and suffering in the world.",
          "answer": "The Problem of Pain"
        },
        {
          "question": "This book by Augustine of Hippo reflects on his life and conversion to Christianity.",
          "answer": "Confessions"
        },
        {
          "question": "This book by Jonathan Edwards is considered a masterpiece of American Puritanism.",
          "answer": "Sinners in the Hands of an Angry God"
        }
      ]
    }
  ];



  // Player setup
  setPlayersButton.addEventListener('click', () => {
    const playerCount = parseInt(playerCountInput.value, 10);
    if (isNaN(playerCount) || playerCount < 1) {
      alert('Please enter a valid number of players.');
      return;
    }

    // Clear existing inputs if any
    playerNameInputsDiv.innerHTML = '';

    for (let i = 1; i <= playerCount; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Player ${i} Name`;
      input.dataset.index = i - 1;
      playerNameInputsDiv.appendChild(input);
    }

    // Show player name inputs and start game button
    playersNamesDiv.style.display = 'block';
  });

  // Start game
  startGameButton.addEventListener('click', () => {
    players = Array.from(playerNameInputsDiv.querySelectorAll('input')).map(input => ({
      name: input.value.trim(),
      money: 0
    })).filter(player => player.name !== '');
    if (players.length === 0) {
      alert('Please enter valid player names.');
      return;
    }

    // Hide player setup
    document.getElementById('playerSetup').style.display = 'none';
    playersNamesDiv.style.display = 'none';

    // Update player stats display
    updatePlayerStats();

    // Load categories and questions from the embedded data
    const categoriesDiv = document.getElementById('categories');
    
    categories.forEach(category => {
      // Create a container for each category
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      
      // Create and append category title
      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = category.category;
      categoryDiv.appendChild(categoryTitle);

      // Loop through each question in the category
      category.questions.forEach((q, index) => {
        // Create a container for each question
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        // Set the text content as a money value
        const moneyValue = `$${(index + 1) * 100}`;
        questionDiv.textContent = moneyValue;
        questionDiv.dataset.question = q.question; // Store the question
        questionDiv.dataset.answer = q.answer; // Store the answer
        questionDiv.dataset.moneyValue = moneyValue; // Store the money value
        questionDiv.dataset.category = category.category; // Store the category name
        
        // Add event listener to show the question in a modal
        questionDiv.addEventListener('click', () => {
          if (!questionDiv.classList.contains('disabled') && !questionDiv.classList.contains('correct')) {
            modalTitle.textContent = 'Question';
            questionText.textContent = q.question;
            answerInput.value = ''; // Clear the previous answer
            submitAnswer.dataset.correctAnswer = q.answer; // Store the correct answer
            submitAnswer.dataset.moneyValue = moneyValue; // Store the money value
            submitAnswer.dataset.category = category.category; // Store the category name
            submitAnswer.dataset.questionDivId = questionDiv.dataset.moneyValue; // Store the question money value
            modal.style.display = 'block';
            answerInput.focus(); // Focus on the input field
          }
        });

        // Append the question div to the category div
        categoryDiv.appendChild(questionDiv);
      });

      // Append the category div to the main categories div
      categoriesDiv.appendChild(categoryDiv);
    });

    // Handle answer submission
    function handleAnswerSubmission() {
      const userAnswer = answerInput.value.trim().toLowerCase();
      const correctAnswer = submitAnswer.dataset.correctAnswer.toLowerCase();
      const moneyValue = parseInt(submitAnswer.dataset.moneyValue.replace('$', ''), 10);
      const categoryName = submitAnswer.dataset.category;

      const questionDiv = Array.from(document.querySelectorAll('.question'))
        .find(div => div.dataset.moneyValue === submitAnswer.dataset.moneyValue && div.dataset.category === categoryName);

      if (userAnswer.includes(correctAnswer)) {
        players[currentPlayerIndex].money += moneyValue;
        alert('Correct!');

        if (questionDiv) {
          questionDiv.classList.add('correct');
          questionDiv.classList.remove('disabled');
        }

        // Continue the same player's turn
      } else {
        alert(`Incorrect. The correct answer was: ${submitAnswer.dataset.correctAnswer}`);

        if (questionDiv) {
          questionDiv.classList.add('disabled');
        }
      }

      // Move to the next player
      if (!userAnswer.includes(correctAnswer)) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      }
      updatePlayerStats();

      modal.style.display = 'none';

      // Check if it's the last question
      if (document.querySelectorAll('.question:not(.correct):not(.disabled)').length === 0) {
        showEndGameModal();
      }
    }

    submitAnswer.addEventListener('click', () => {
      handleAnswerSubmission();
    });

    // Handle Enter key press for answer submission
    answerInput.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        handleAnswerSubmission();
      }
    });

    // Handle closing the modal
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close modal if the user clicks outside of the modal content
    window.addEventListener('click', event => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  function updatePlayerStats() {
    if (!currentTurnElement || !playersMoneyElement) {
      console.error('One or more required elements are missing from the DOM.');
      return;
    }

    currentTurnElement.textContent = players.length > 0 ? `${players[currentPlayerIndex].name}'s Turn` : 'None';
    playersMoneyElement.innerHTML = players.map(player => 
      `<div><strong>${player.name}</strong>: $${player.money}</div>`
    ).join('');
  }

  function showEndGameModal() {
    const endGameModal = document.getElementById('endGameModal');
    const endGameModalTitle = document.getElementById('endGameModalTitle');
    const endGameModalContent = document.getElementById('endGameModalContent');
    const playAgainButton = document.getElementById('playAgain');
    const mainMenuButton = document.getElementById('mainMenu');

    if (!endGameModal || !endGameModalTitle || !endGameModalContent || !playAgainButton || !mainMenuButton) {
      console.error('One or more required elements for the end game modal are missing from the DOM.');
      return;
    }

    const winner = players.reduce((max, player) => player.money > max.money ? player : max, players[0]);

    endGameModalTitle.textContent = 'Game Over';
    endGameModalContent.innerHTML = `
      <p>The winner is <strong>${winner.name}</strong> with $${winner.money}!</p>
      <p>Final Scores:</p>
      ${players.map(player => `<div><strong>${player.name}</strong>: $${player.money}</div>`).join('')}
    `;

    endGameModal.style.display = 'block';

    playAgainButton.addEventListener('click', () => {
      location.reload(); // Reload the page to restart the game
    });

    mainMenuButton.addEventListener('click', () => {
      location.reload(); // Reload the page to go back to the main menu
    });
  }
});
