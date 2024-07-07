var palavrasFacil = ['sol', 'lua', 'terra', 'marte', 'venus', 'jupiter', 'saturno', 'urano', 'netuno', 'mercurio', 'ceu', 'astro', 'plutao', 'cinturao de asteroides', 'gas', 'universo', 'galáxia', 'estrela cadente', 'sistema solar', 'nebulosa', 'cometa', 'eclipses', 'gravidade', 'meteoro', 'via lactea', 'planeta anao', 'supernova', 'astronauta', 'astronomia', 'orbita'];
var dicasFacil = ['estrelas', 'satélite natural', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'planeta', 'espaço', 'espaço', 'planeta', 'asteroides', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço', 'espaço'];

// Médio
var palavrasMedio = ['andromeda', 'constelacao', 'ana vermelha', 'supernova', 'ana branca', 'magnetosfera', 'aglomerado estelar', 'pulsar', 'quasar', 'cinturao de kuiper', 'exoplaneta', 'buraco negro', 'cumulo estelar', 'colisao de galaxias', 'vida extraterrestre', 'onda gravitacional', 'telescopio', 'planetario', 'infravermelho', 'escala cosmica', 'zona habitavel', 'ano-luz', 'buraco de minhoca', 'evento de extincao', 'matria escura', 'nuvem interestelar', 'missao espacial', 'rover', 'estacao espacial'];
var dicasMedio = ['galáxia', 'espaço', 'estrelas', 'fenômeno estelar', 'estrelas', 'campo magnético', 'estrelas', 'estrelas', 'estrelas', 'espaço', 'planeta', 'fenômeno espacial', 'estrelas', 'espaço', 'possibilidade espaço', 'fenômeno espacial', 'equipamento astronômico', 'lugar', 'radiação espacial', 'espaço', 'espaço', 'unidade de distancia', 'teoria', 'fenomeno cosmico', 'teoria', 'espaço', 'exploração', 'exploração', 'exploração'];

// Difícil
var palavrasDificil = ['big bang', 'centauro', 'materia exotica', 'singularidade', 'multiverso', 'vacuo quantico', 'espaço-tempo', 'buraco de verme', 'hipergravidade', 'viagem interestelar', 'constante cosmologica', 'efeito de gravitacional', 'teoria das cordas', 'dobra espacial', 'energia escura', 'ponto de lagrange', 'fluxo de materia', 'raios cosmicos', 'inflacao cosmica', 'radiotelescopio', 'disrupcao tidal', 'magnetar', 'nebulosa planetaria', 'microlente gravitacional', 'tempo cosmico', 'onda gravitacional', 'radiacao cosmica de fundo', 'anomalia gravitacional'];
var dicasDificil = ['teoria', 'espaço', 'teoria', 'conceito', 'teoria', 'teoria', 'conceito', 'teoria', 'conceito', 'exploração', 'teoria', 'fenômeno', 'teoria', 'conceito', 'teoria', 'conceito', 'conceito', 'fenômeno', 'teoria', 'equipamento', 'fenômeno', 'estrela', 'espaço', 'fenômeno', 'conceito', 'teoria', 'fenômeno', 'fenômeno', 'fenomeno'];

var digitadas;
var chancas;
var palavra;
var dica;
const navbar_btt = document.querySelector(".navbar_button");
const navbar_links = document.querySelector(".navbar_links");
const navbar = document.querySelector(".dropdown");

function startGame(dificuldade) {
    digitadas = [];
    chancas = 6;
    switch (dificuldade) {
        case 'facil':
            palavra = palavrasFacil[Math.floor(Math.random() * palavrasFacil.length)];
            dica = dicasFacil[palavrasFacil.indexOf(palavra)];
            break;
        case 'medio':
            palavra = palavrasMedio[Math.floor(Math.random() * palavrasMedio.length)];
            dica = dicasMedio[palavrasMedio.indexOf(palavra)];
            break;
        case 'dificil':
            palavra = palavrasDificil[Math.floor(Math.random() * palavrasDificil.length)];
            dica = dicasDificil[palavrasDificil.indexOf(palavra)];
            break;
    }

    document.getElementById('dica').textContent = dica;
    updateWord();
    document.getElementById('chances-count').textContent = chancas;

    // Gerar os botões de letras
    var lettersContainer = document.getElementById('letters-container');
    lettersContainer.innerHTML = ''; // Limpar letras anteriores
    for (var i = 97; i <= 122; i++) {
        var letter = String.fromCharCode(i);
        var letterButton = document.createElement('button');
        letterButton.textContent = letter;
        letterButton.onclick = function () {
            var letra = this.textContent;
            if (!digitadas.includes(letra)) {
                digitadas.push(letra);
                if (palavra.includes(letra)) {
                    updateWord();
                    if (!document.getElementById('palavra').textContent.includes('*')) {
                        alert('Parabéns, você venceu!');
                        resetGame();
                    }
                } else {
                    chancas--;
                    document.getElementById('chances-count').textContent = chancas;
                    desenharParteForca(6 - chancas);
                    if (chancas === 0) {
                        alert('Você perdeu! A palavra era: ' + palavra);
                        resetGame();
                    }
                }
            }
        };
        lettersContainer.appendChild(letterButton);
    }

    // Esconde os botões de dificuldade
    document.getElementById('difficulty-buttons').style.display = 'none';
    desenharForca();
}

function updateWord() {
    var palavraExibida = '';
    for (var i = 0; i < palavra.length; i++) {
        if (palavra[i] === ' ') {
            palavraExibida += ' ';
        } else if (digitadas.indexOf(palavra[i]) !== -1) {
            palavraExibida += palavra[i];
        } else {
            palavraExibida += '*';
        }
    }
    document.getElementById('palavra').textContent = palavraExibida;

    var palavraSemEspacos = palavra.replace(/ /g, '');
    var palavraExibidaSemEspacos = palavraExibida.replace(/ /g, '');
    if (palavraExibidaSemEspacos === palavraSemEspacos) {
        alert('Parabéns! Você ganhou!');
        resetGame();
    }
}

function desenharForca() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(ctx, 20, 190, 180, 190); // Base
    drawLine(ctx, 50, 20, 50, 190); // Poste
    drawLine(ctx, 100, 20, 50, 20); // Trave superior
    drawLine(ctx, 100, 20, 100, 50); // Corda
}

function desenharParteForca(part) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    switch (part) {
        case 1:
            drawCircle(ctx, 100, 65, 15); // Cabeça
            break;
        case 2:
            drawLine(ctx, 100, 150, 100, 80); // Corpo
            break;
        case 3:
            drawLine(ctx, 100, 80, 70, 110); // Braço esquerdo
            break;
        case 4:
            drawLine(ctx, 100, 80, 130, 110); // Braço direito
            break;
        case 5:
            drawLine(ctx, 100, 150, 70, 180); // Perna esquerda
            break;
        case 6:
            drawLine(ctx, 100, 150, 130, 180); // Perna direita
            break;
    }
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
}

function resetGame() {
    document.getElementById('letters-container').innerHTML = '';
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('difficulty-buttons').style.display = 'block';
}

function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
        
    }
}

function toggle_menu(event) {
    if (event.type === 'touchstart') event.preventDefault();

    navbar_links.classList.toggle('active');
    navbar.classList.toggle('active');
}

navbar_btt.addEventListener('click', toggle_menu);
navbar_btt.addEventListener('touchstart', toggle_menu);

function navigateTo(page) {
    console.log("Navigating to", page);
    window.location.href = page;
}
