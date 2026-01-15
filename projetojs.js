// Aguarda o carregamento completo da página (DOM + Imagens/Recursos externos)
window.addEventListener("load", function () {

    // ==========================================
    // 1. SELEÇÃO DE ELEMENTOS DO DOM
    // ==========================================
    
    // Botões de navegação (setas esquerda/direita)
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    // Elementos do Slider (Slides e Indicadores)
    const items = document.querySelectorAll(".item");   // Lista de slides
    const dots = document.querySelectorAll(".dot");     // Lista de bolinhas indicadoras
    const numberindicator = document.querySelector(".number"); // Contador numérico (01, 02...)

    // ==========================================
    // 2. ESTADO INICIAL DA APLICAÇÃO
    // ==========================================
    
    let active = 0;             // Índice do slide atual (começa no 0)
    const total = items.length; // Total de slides disponíveis
    let timer;                  // Variável para armazenar o intervalo automático

    // ==========================================
    // 3. FUNÇÃO PRINCIPAL DE NAVEGAÇÃO
    // ==========================================
    
    /**
     * Atualiza o slide visível com base na direção.
     * @param {number} direction - 1 para avançar, -1 para voltar.
     */
    function update(direction) {
        // --- Limpeza do Estado Anterior ---
        // Remove a classe 'active' do slide e do indicador que estão visíveis agora
        document.querySelector(".item.active").classList.remove("active");
        document.querySelector(".dot.active").classList.remove("active");

        // --- Cálculo do Novo Índice ---
        if (direction > 0) {
            // Se direção for positiva (Próximo)
            active = active + 1;
            // Se chegar no fim da lista, volta para o primeiro (Loop infinito)
            if (active === total) active = 0; 
        } else if (direction < 0) {
            // Se direção for negativa (Anterior)
            active = active - 1;
            // Se for menor que zero (antes do primeiro), vai para o último
            if (active < 0) active = total - 1; 
        }

        // --- Aplicação do Novo Estado ---
        // Adiciona classe 'active' ao novo slide e ao novo indicador
        items[active].classList.add("active");
        dots[active].classList.add("active");
        
        // Atualiza o texto do número (somamos +1 pois o índice começa em 0)
        numberindicator.textContent = active + 1; 
    }

    // ==========================================
    // 4. AUTOPLAY (ROTAGEM AUTOMÁTICA)
    // ==========================================
    
    clearInterval(timer); // Garante que não existam timers duplicados rodando
    timer = setInterval(function () {
        update(1); // Chama a função update para avançar a cada intervalo
    }, 100000); // Intervalo definido: 100 segundos (100000ms)

    // ==========================================
    // 5. EVENTOS DE NAVEGAÇÃO (CLIQUES)
    // ==========================================
    
    // Evento ao clicar na seta "Anterior"
    prevButton.addEventListener("click", function () {
        update(-1); // Passa -1 para voltar um slide
    });

    // Evento ao clicar na seta "Próximo"
    nextButton.addEventListener("click", function () {
        update(1); // Passa 1 para avançar um slide
    });

    // ==========================================
    // 6. FUNCIONALIDADE "SAIBA MAIS" (EXPANDIR TEXTO)
    // ==========================================
    
    // Seleciona todos os botões com a classe .btn e itera sobre eles
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            // Seleciona o elemento irmão anterior (o parágrafo .product-description)
            const description = this.previousElementSibling;

            // Alterna a classe 'expanded' (definida no CSS para mostrar todo o texto)
            description.classList.toggle('expanded');

            // Lógica ternária para trocar o texto do botão:
            // Se tiver a classe 'expanded', texto vira "VER MENOS", senão "SAIBA MAIS"
            this.textContent = description.classList.contains('expanded') ? 'VER MENOS' : 'SAIBA MAIS';
        });
    });

    // ==========================================
    // 7. LÓGICA DO MODAL (POP-UP DE CONTATO)
    // ==========================================
    
    // Seleção dos elementos do modal
    const modal = document.getElementById('modalContato');
    const btnContato = document.getElementById('btncontato'); // Botão no Header
    const spanClose = document.getElementById('closeModal');  // Botão "X" de fechar

    // Função para ABRIR o modal
    btnContato.onclick = function () {
        modal.classList.add('open'); // Adiciona classe que muda display:none para flex
        console.log("Modal aberto"); // Log para debug
    }

    // Função para FECHAR o modal ao clicar no "X"
    spanClose.onclick = function () {
        modal.classList.remove('open'); // Remove a classe, escondendo o modal
    }

    // Função para FECHAR ao clicar fora da caixa (no fundo escuro)
    window.onclick = function (event) {
        // Verifica se o elemento clicado é exatamente o fundo (overlay) e não a caixa interna
        if (event.target == modal) {
            modal.classList.remove('open');
        }
    }

});