document.addEventListener("DOMContentLoaded", () => {
    const calculatorContainer = document.getElementById("calculator-container");
    if (!calculatorContainer) return;

    const questions = [
      {
        id: "q1",
        text: "Com que frequência você consome carne vermelha?",
        category: "Alimentação",
        options: [
          { text: "Diariamente", score: 3 },
          { text: "Algumas vezes por semana", score: 2 },
          { text: "Raramente/Nunca", score: 1 },
        ],
      },
      {
        id: "q2",
        text: "Você consome muitos alimentos processados/embalados?",
        category: "Alimentação",
        options: [
          { text: "Sim, com frequência", score: 3 },
          { text: "Às vezes", score: 2 },
          { text: "Não, priorizo alimentos frescos", score: 1 },
        ],
      },
      {
        id: "q3",
        text: "Qual seu principal meio de transporte diário?",
        category: "Transporte",
        options: [
          { text: "Carro particular (sozinho)", score: 3 },
          { text: "Transporte público ou carona", score: 2 },
          { text: "Bicicleta/A pé", score: 1 },
        ],
      },
      {
        id: "q4",
        text: "Com que frequência você viaja de avião por ano (viagens longas)?",
        category: "Transporte",
        options: [
          { text: "3 ou mais vezes", score: 3 },
          { text: "1-2 vezes", score: 2 },
          { text: "Nenhuma vez", score: 1 },
        ],
      },
      {
        id: "q5",
        text: "Você utiliza lâmpadas de baixo consumo (LED) em sua casa?",
        category: "Energia em Casa",
        options: [
          { text: "Não, a maioria é incandescente/fluorescente", score: 3 },
          { text: "Em parte da casa", score: 2 },
          { text: "Sim, em toda a casa", score: 1 },
        ],
      },
      {
        id: "q6",
        text: "Você desliga aparelhos eletrônicos da tomada quando não estão em uso?",
        category: "Energia em Casa",
        options: [
          { text: "Raramente", score: 3 },
          { text: "Às vezes", score: 2 },
          { text: "Sempre que possível", score: 1 },
        ],
      },
      {
        id: "q7",
        text: "Você separa o lixo para reciclagem?",
        category: "Resíduos",
        options: [
          { text: "Não separo", score: 3 },
          { text: "Separo alguns itens", score: 2 },
          { text: "Sim, separo todos os recicláveis", score: 1 },
        ],
      },
      {
        id: "q8",
        text: "Você evita o uso de plásticos descartáveis (sacolas, copos, canudos)?",
        category: "Resíduos",
        options: [
          { text: "Não me preocupo com isso", score: 3 },
          { text: "Tento evitar às vezes", score: 2 },
          { text: "Sim, busco alternativas reutilizáveis", score: 1 },
        ],
      },
    ];

    let answers = {};

    function renderCalculator() {
        calculatorContainer.innerHTML = ""; // Limpa o conteúdo anterior
        const form = document.createElement("form");
        form.id = "footprint-form";

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question-item";
            questionDiv.innerHTML = `
                <p class="question-text">${index + 1}. ${q.text} <em>(${q.category})</em></p>
            `;
            const optionsDiv = document.createElement("div");
            optionsDiv.className = "options-group";

            q.options.forEach(opt => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = q.id;
                input.value = opt.score;
                input.addEventListener("change", () => {
                    answers[q.id] = parseInt(opt.score);
                });
                label.appendChild(input);
                label.appendChild(document.createTextNode(` ${opt.text}`));
                optionsDiv.appendChild(label);
            });
            questionDiv.appendChild(optionsDiv);
            form.appendChild(questionDiv);
        });

        const submitButton = document.createElement("button");
        submitButton.type = "button";
        submitButton.textContent = "Calcular Minha Pegada";
        submitButton.className = "btn btn-calculate";
        submitButton.addEventListener("click", calculateFootprint);
        form.appendChild(submitButton);

        calculatorContainer.appendChild(form);
    }

    function calculateFootprint() {
        if (Object.keys(answers).length !== questions.length) {
            alert("Por favor, responda todas as perguntas.");
            return;
        }
        const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
        let footprintLevel = "";
        let advice = "";

        if (totalScore <= 10) {
            footprintLevel = "Baixa";
            advice = "Parabéns! Sua pegada ecológica é relativamente baixa. Continue com seus hábitos sustentáveis e inspire outros a fazerem o mesmo. Pequenas melhorias são sempre bem-vindas, como pesquisar ainda mais sobre consumo consciente.";
        } else if (totalScore <= 18) {
            footprintLevel = "Média";
            advice = "Sua pegada ecológica está na média. Há espaço para melhorias! Considere reduzir o consumo de carne, optar por transporte público ou bicicleta com mais frequência e ser mais rigoroso com a reciclagem. Pequenas mudanças fazem uma grande diferença.";
        } else {
            footprintLevel = "Alta";
            advice = "Sua pegada ecológica é considerada alta. É um bom momento para refletir sobre seus hábitos e buscar alternativas mais sustentáveis. Reduzir o consumo de carne, usar menos o carro particular, economizar energia em casa e diminuir o uso de plásticos são passos importantes.";
        }
        renderResult(footprintLevel, totalScore, advice);
    }

    function renderResult(level, score, adviceText) {
        calculatorContainer.innerHTML = `
            <div class="result-section">
                <h3>Seu Resultado:</h3>
                <p class="footprint-level">${level}</p>
                <p class="footprint-score">(Pontuação: ${score} de ${questions.length * 3})</p>
                <div class="advice">
                    <strong>Conselho:</strong> ${adviceText}
                </div>
                <button id="recalculate-btn" class="btn">Calcular Novamente</button>
            </div>
        `;
        document.getElementById("recalculate-btn").addEventListener("click", () => {
            answers = {};
            renderCalculator();
        });
    }

    renderCalculator(); // Renderiza a calculadora inicialmente
});

