
function renderNextQuestion(res) {
    // Generate a random equation for the next question
    const { equation, answer } = generateRandomEquation();

    // Start the timer for 30 seconds
    startTimer(() => {
        // Timer ran out, record the user response as incorrect
        recordUserResponse(answer, null, false);
        // Render the next question or display results if it's the last question
        renderNextQuestionOrResults(res);
    });

    // Render the game page with the current question
    res.render("game", { equation, answer });
}

function renderNextQuestionOrResults(res) {
    // Check if there are more questions
    if (gameData.questions.length < 10) {
        // Render the next question
        renderNextQuestion(res);
    } else {
        // All questions answered, render the results page
        renderResults(res);
    }
}

function renderResults(res) {
    // Render the results page with user responses and overall score
    res.render("results", { userResponses: gameData.userResponses, score: `${gameData.score}/10` });
}

//Function to generate a random equation
function generateRandomEquation() {
    console.log('all fine random equation')
    const operators = ['+', '-', 'x', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    let equation;
    switch (operator) {
        case '+':
            equation = `${num1} + ${num2}`;
            break;
        case '-':
            equation = `${num1} - ${num2}`;
            break;
        case 'x':
            equation = `${num1} x ${num2}`;
            break;
        case '/':
            equation = `${num1} / ${num2}`;
            break;
        default:
            equation = '';
    }

    return { equation, answer: eval(equation) };
}

//Function to generate random options for the game (customize as needed)
function generateRandomOptions() {
    // Generate three random incorrect answers
    const incorrectAnswers = [];
    while (incorrectAnswers.length < 3) {
        const option = Math.floor(Math.random() * 20); // Adjust range as needed
        if (!incorrectAnswers.includes(option)) {
            incorrectAnswers.push(option);
        }
    }

    // Generate one correct answer
    const correctAnswer = eval(generateRandomEquation());

    // Combine correct and incorrect answers and shuffle
    const options = [...incorrectAnswers, correctAnswer];
    shuffleArray(options);

    return options;
}

//Function to check if the user's answer is correct
function checkAnswer(userAnswer) {
    // Compare user's answer with the correct answer
    const correctAnswer = eval(generateRandomEquation());
    return userAnswer == correctAnswer;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer(callback) {
    let seconds = 30;
    const timerInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            // Update UI with remaining seconds (optional)
        } else {
            clearInterval(timerInterval);
            callback(); // Timer ran out, invoke the callback
        }
    }, 1000); // Update every second
}

const gameData = {
    questions: [],
    userResponses: [],
    score: 0,
};

function recordUserResponse(answer, selectedChoice, isCorrect) {
    gameData.userResponses.push({
        answer,
        selectedChoice,
        isCorrect,
    });

    if (isCorrect) {
        gameData.score++;
    }
}


module.exports = {
    renderNextQuestion,
    renderNextQuestionOrResults,
    renderResults,
    generateRandomEquation,
    generateRandomOptions,
    checkAnswer,
    shuffleArray,
    startTimer,
    gameData,
    recordUserResponse
}