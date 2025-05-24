document.addEventListener('DOMContentLoaded', function() {
    // Simulação de contador animado
    const contadorNumero = document.getElementById('contador-numero');
    if (contadorNumero) {
        let valorFinal = 75; // Valor ilustrativo, pode ser dinâmico
        let valorAtual = 0;
        const incremento = Math.ceil(valorFinal / 100); // Controla a velocidade da animação

        function animarContador() {
            if (valorAtual < valorFinal) {
                valorAtual += incremento;
                if (valorAtual > valorFinal) valorAtual = valorFinal;
                contadorNumero.textContent = valorAtual;
                setTimeout(animarContador, 20); // Ajuste o tempo para velocidade
            } else {
                contadorNumero.textContent = valorFinal; // Garante que o valor final seja exato
            }
        }
        animarContador();
    }

    // Lógica para Abas Navegáveis
    const tabLinks = document.querySelectorAll('nav .tab-link, .tab-link-card');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabContentWrapper = document.getElementById('tab-content-wrapper');

    function switchTab(targetId) {
        tabContents.forEach(content => {
            content.classList.remove('active-content');
        });
        tabLinks.forEach(link => {
            link.classList.remove('active-tab');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active-tab');
            }
        });

        const activeContent = document.querySelector(targetId);
        if (activeContent) {
            activeContent.classList.add('active-content');
        }
        // Força o navegador a aplicar a classe antes de mudar a opacidade para a transição funcionar
        if (tabContentWrapper) { 
            tabContentWrapper.style.opacity = '0';
            setTimeout(() => {
                tabContentWrapper.style.opacity = '1';
            }, 50); // Pequeno delay para garantir a transição
        }
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            switchTab(targetId);
            // Rolar para o topo da seção de conteúdo da aba, se não for a aba inicial
            if (targetId !== '#inicio') {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20; // 20px de margem
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                 window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
            }
        });
    });

    // Inicializa a aba correta se houver um hash na URL (embora neste caso seja SPA)
    if (window.location.hash) {
        const initialTabId = window.location.hash;
        // Verifica se o hash corresponde a uma aba válida
        const isValidTab = Array.from(tabLinks).some(link => link.getAttribute('href') === initialTabId);
        if (isValidTab) {
            switchTab(initialTabId);
        } else {
            switchTab('#inicio'); // Fallback para a aba inicial se o hash for inválido
        }
    } else {
        switchTab('#inicio'); // Aba inicial padrão
    }

    console.log('Script carregado e DOM pronto!');
});

function calcularPegada() {
    const transporteTipo = document.getElementById('transporteTipo').value;
    const transporteDistancia = parseFloat(document.getElementById('transporteDistancia').value) || 0;
    const energiaConsumo = parseFloat(document.getElementById('energiaConsumo').value) || 0;
    const gasConsumo = parseFloat(document.getElementById('gasConsumo').value) || 0;

    let emissoesTransporte = 0;
    const diasNoMes = 30; 

    const fatorGasolina = 0.18; 
    const fatorAlcool = 0.10;   
    const fatorMoto = 0.09;     
    const fatorOnibus = 0.085;  
    const fatorEnergia = 0.075; 
    const fatorGasGLP = 35.9; 

    if (transporteTipo !== 'nenhum') {
        let fatorTransporteSelecionado = 0;
        switch (transporteTipo) {
            case 'gasolina':
                fatorTransporteSelecionado = fatorGasolina;
                break;
            case 'alcool':
                fatorTransporteSelecionado = fatorAlcool;
                break;
            case 'moto':
                fatorTransporteSelecionado = fatorMoto;
                break;
            case 'onibus':
                fatorTransporteSelecionado = fatorOnibus;
                break;
        }
        emissoesTransporte = transporteDistancia * fatorTransporteSelecionado * diasNoMes;
    }

    const emissoesEnergia = energiaConsumo * fatorEnergia;
    const emissoesGas = gasConsumo * fatorGasGLP;

    const emissoesTotais = emissoesTransporte + emissoesEnergia + emissoesGas;

    const resultadoDiv = document.getElementById('resultadoCalculadora');
    resultadoDiv.innerHTML = `<p>Sua pegada de carbono mensal estimada é de aproximadamente: <strong>${emissoesTotais.toFixed(2)} kg CO2e</strong>.</p>
                            <p><small>Este é um cálculo simplificado. Fatores como tipo de veículo específico, eficiência energética de aparelhos, origem da energia e hábitos de consumo detalhados podem alterar significativamente este valor.</small></p>`;
}

