const words = [
  { word: "boil", hint: "Pronunciación: /bɔɪl/", translation: "hervir" },
  { word: "coil", hint: "Pronunciación: /kɔɪl/", translation: "bobina" },
  { word: "soil", hint: "Pronunciación: /sɔɪl/", translation: "suelo" },
  { word: "foil", hint: "Pronunciación: /fɔɪl/", translation: "papel de aluminio" },
  { word: "noisy", hint: "Pronunciación: /ˈnɔɪ.zi/", translation: "ruidoso" },
  { word: "point", hint: "Pronunciación: /pɔɪnt/", translation: "punto" },
  { word: "join", hint: "Pronunciación: /dʒɔɪn/", translation: "unirse" },
  { word: "coin", hint: "Pronunciación: /kɔɪn/", translation: "moneda" },
  { word: "spoil", hint: "Pronunciación: /spɔɪl/", translation: "estropear" },
  { word: "toil", hint: "Pronunciación: /tɔɪl/", translation: "trabajar duro" },
  { word: "loyal", hint: "Pronunciación: /ˈlɔɪ.əl/", translation: "leal" },
  { word: "royal", hint: "Pronunciación: /ˈrɔɪ.əl/", translation: "real" },
  { word: "poise", hint: "Pronunciación: /pɔɪz/", translation: "equilibrio" },
  { word: "enjoy", hint: "Pronunciación: /ɪnˈdʒɔɪ/", translation: "disfrutar" },
  { word: "foist", hint: "Pronunciación: /fɔɪst/", translation: "imponer" },
  { word: "recoil", hint: "Pronunciación: /rɪˈkɔɪl/", translation: "retroceder" },
  { word: "poison", hint: "Pronunciación: /ˈpɔɪ.zən/", translation: "veneno" },
];

let currentWord = "";
let displayedWord = "";
let score = 0;
let lives = 3;
let timer;
let timeLimit;

function startTimer() {
    clearTimeout(timer);
    timeLimit = Math.floor(Math.random() * (20 - 15 + 1)) + 15; // Tiempo aleatorio entre 15 y 20 segundos
    document.getElementById("time-left").innerText = timeLimit;

    timer = setInterval(() => {
        timeLimit--;
        document.getElementById("time-left").innerText = timeLimit;

        if (timeLimit <= 0) {
            clearInterval(timer);
            lives--;
            document.getElementById("lives").innerText = `Lives: ${lives}`;
            alert("Time's up! You lost a life.");
            if (lives === 0) {
                alert("Game over! Your final score is: " + score);
                location.reload();
            } else {
                startGame(); // Reiniciar el juego
            }
        }
    }, 1000);
}

function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word;
    displayedWord = currentWord.split('').map((letter, index) => {
        return index < 3 ? letter : '_';
    }).join(' ');
    document.getElementById("word-display").innerText = displayedWord;
    startTimer(); // Iniciar el temporizador al comenzar el juego
}

function speakWord(word) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    synth.speak(utterance);
}

document.getElementById("submit-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    document.getElementById("user-input").value = "";

    if (userInput.length === 1 && currentWord.includes(userInput)) {
        displayedWord = displayedWord.split(' ').map((letter, index) => {
            return letter === '_' && currentWord[index] === userInput ? userInput : letter;
        }).join(' ');
        document.getElementById("word-display").innerText = displayedWord;

        if (!displayedWord.includes('_')) {
            score++;
            document.getElementById("score").innerText = `Points: ${score}`;
            alert("Correct! You've guessed the word.");

            // Mostrar la traducción
            const translation = words.find(word => word.word === currentWord).translation;
            alert(`The translation of "${currentWord}" is: "${translation}"`);

            startGame();
        }
    } else {
        lives--;
        document.getElementById("lives").innerText = `Lives: ${lives}`;
        alert("Incorrect. Try again.");
        if (lives === 0) {
            alert("Game over! Your final score is: " + score);
            location.reload();
        }
    }
});

document.getElementById("hint-btn").addEventListener("click", () => {
    const hint = words.find(word => word.word === currentWord).hint;
    document.getElementById("hint").innerText = hint;
    document.getElementById("hint").style.display = "block";
    
    speakWord(currentWord);
});

// Funcionalidad del botón de menú
document.getElementById("menu-btn").addEventListener("click", () => {
    const rulesContainer = document.getElementById("rules-container");
    rulesContainer.style.display = rulesContainer.style.display === "none" ? "block" : "none";
});

// Funcionalidad del botón de cerrar
document.getElementById("close-menu-btn").addEventListener("click", () => {
    document.getElementById("rules-container").style.display = "none";
});

// Cambio de idioma
document.getElementById("change-language-btn").addEventListener("click", () => {
    const rulesTitle = document.getElementById("rules-title");
    const rulesList = document.getElementById("rules-list");
    const changeButton = document.getElementById("change-language-btn");

    if (changeButton.innerText === "Change to Spanish") {
        rulesTitle.innerText = "Reglas del Juego de Diptongo OI";
        rulesList.innerHTML = `
            <li>Objetivo del Juego: Completar correctamente las palabras que contienen el diptongo "OI" para ganar puntos.</li>
            <li>Decir la Palabra Correctamente: Después de adivinar la palabra correctamente, el equipo debe decir la palabra; de lo contrario, no recibirán el punto que ganaron.</li>
            <li>Uso de Pistas: 
                <ul>
                    <li>El jugador puede solicitar una pista que consiste en la pronunciación de la palabra completa. Solo se permite una pista por palabra.</li>
                </ul>
            </li>
            <li>Sistema de Puntos:
                <ul>
                    <li>Cada vez que el jugador completa correctamente una palabra, recibe 1 punto.</li>
                    <li>Si el jugador completa la palabra incorrectamente, no recibe puntos y pierde 1 vida.</li>
                </ul>
            </li>
            <li>Vidas:
                <ul>
                    <li>Cada equipo comienza con un total de 3 vidas.</li>
                    <li>Si el equipo pierde todas sus vidas, el juego termina.</li>
                </ul>
            </li>
            <li>Límite de Tiempo: 
                <ul>
                    <li>La bomba puede explotar en cualquier momento, ¡así que piensa rápido!</li>
                </ul>
            </li>
        `;
        changeButton.innerText = "Cambiar a Inglés";
    } else {
        rulesTitle.innerText = "Rules of the OI Diphthong Game";
        rulesList.innerHTML = `
            <li>Objective of the Game: Correctly complete the words that contain the diphthong "OI" to earn points.</li>
            <li>Saying the Word Correctly: After guessing the word correctly, the team must say the word; otherwise, they will not receive the point they earned.</li>
            <li>Use of Hints: 
                <ul>
                    <li>The player can request a hint that consists of the pronunciation of the complete word. Only one hint is allowed per word.</li>
                </ul>
            </li>
            <li>Point System:
                <ul>
                    <li>Each time the player correctly completes a word, they receive 1 point.</li>
                    <li>If the player completes the word incorrectly, they do not receive points and lose 1 life.</li>
                </ul>
            </li>
            <li>Lives:
                <ul>
                    <li>Each team starts with a total of 3 lives.</li>
                    <li>If the team loses all their lives, the game ends.</li>
                </ul>
            </li>
            <li>Time Limit: 
                <ul>
                    <li>The bomb can explode at any moment, so think fast!</li>
                </ul>
            </li>
        `;
        changeButton.innerText = "Change to Spanish";
    }
});

// Iniciar el juego
startGame();