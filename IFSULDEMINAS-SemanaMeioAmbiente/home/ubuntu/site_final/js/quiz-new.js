document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    if (!quizContainer) return;

    const questions = [
        {
            questionText: "Qual é o principal gás responsável pelo efeito estufa?",
            answerOptions: [
                { answerText: "Oxigênio", isCorrect: false },
                { answerText: "Nitrogênio", isCorrect: false },
                { answerText: "Dióxido de Carbono", isCorrect: true },
                { answerText: "Hélio", isCorrect: false },
            ],
        },
        {
            questionText: "Qual das seguintes ações contribui para a redução da pegada de carbono?",
            answerOptions: [
                { answerText: "Usar mais o carro particular", isCorrect: false },
                { answerText: "Aumentar o consumo de carne vermelha", isCorrect: false },
                { answerText: "Utilizar transporte público e bicicleta", isCorrect: true },
                { answerText: "Descartar lixo eletrônico no lixo comum", isCorrect: false },
            ],
        },
        {
            questionText: "O que é \"desenvolvimento sustentável\"?",
            answerOptions: [
                { answerText: "Crescimento econômico a qualquer custo", isCorrect: false },
                { answerText: "Desenvolvimento que atende às necessidades do presente sem comprometer a capacidade das futuras gerações de suprir suas próprias necessidades", isCorrect: true },
                { answerText: "Foco exclusivo na preservação ambiental, sem considerar aspectos sociais e econômicos", isCorrect: false },
                { answerText: "Utilização irrestrita dos recursos naturais", isCorrect: false },
            ],
        },
        {
            questionText: "Qual o principal objetivo do Acordo de Paris?",
            answerOptions: [
                { answerText: "Proibir a pesca industrial", isCorrect: false },
                { answerText: "Limitar o aquecimento global a bem abaixo de 2°C, preferencialmente a 1.5°C, em relação aos níveis pré-industriais", isCorrect: true },
                { answerText: "Promover o uso de combustíveis fósseis", isCorrect: false },
                { answerText: "Incentivar o desmatamento para expansão agrícola", isCorrect: false },
            ],
        },
    ];

    let currentQuestion = 0;
    let score = 0;

    function renderQuiz() {
        quizContainer.innerHTML = ""; // Limpa o conteúdo anterior

        if (currentQuestion >= questions.length) {
            renderScore();
            return;
        }

        const q = questions[currentQuestion];

        const questionDiv = document.createElement("div");
        questionDiv.className = "question-section";
        questionDiv.innerHTML = `
            <div class="question-count">Questão ${currentQuestion + 1}/${questions.length}</div>
            <div class="question-text">${q.questionText}</div>
        `;

        const answerDiv = document.createElement("div");
        answerDiv.className = "answer-section";

        q.answerOptions.forEach(opt => {
            const button = document.createElement("button");
            button.textContent = opt.answerText;
            button.className = "btn-answer";
            button.addEventListener("click", () => handleAnswerOptionClick(opt.isCorrect));
            answerDiv.appendChild(button);
        });

        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(answerDiv);
    }

    function handleAnswerOptionClick(isCorrect) {
        if (isCorrect) {
            score++;
        }
        currentQuestion++;
        renderQuiz();
    }

    function renderScore() {
        quizContainer.innerHTML = `
            <div class="score-section">
                <h3>Quiz Finalizado!</h3>
                <p>Você acertou ${score} de ${questions.length} perguntas!</p>
                <button id="restart-quiz-btn" class="btn">Tentar Novamente</button>
            </div>
        `;
        document.getElementById("restart-quiz-btn").addEventListener("click", () => {
            currentQuestion = 0;
            score = 0;
            renderQuiz();
        });
    }

    renderQuiz(); // Renderiza o quiz inicialmente
});
