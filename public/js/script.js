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
  const categories = [
    {
      category: "Science",
      questions: [
        { question: "What is the chemical symbol for water?", answer: "H2O" },
        { question: "What planet is known as the Red Planet?", answer: "Mars" }
      ]
    },
    {
      category: "History",
      questions: [
        { question: "Who was the first President of the United States?", answer: "George Washington" },
        { question: "In what year did the Titanic sink?", answer: "1912" }
      ]
    }
    // Add more categories and questions as needed
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
