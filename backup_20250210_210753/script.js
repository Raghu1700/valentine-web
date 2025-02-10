// Initial page functionality
function answerFirstQuestion(isSubhi) {
    const firstQuestion = document.getElementById('first-question');
    const valentineQuestion = document.getElementById('valentine-question');
    const wrongPerson = document.getElementById('wrong-person');

    if (isSubhi) {
        firstQuestion.classList.add('hidden');
        valentineQuestion.classList.remove('hidden');
    } else {
        firstQuestion.classList.add('hidden');
        wrongPerson.classList.remove('hidden');
    }
}

function answerValentine(isYes) {
    const valentineQuestion = document.getElementById('valentine-question');
    const successMessage = document.getElementById('success-message');
    const pleaseBtn = document.getElementById('please-btn');

    if (isYes) {
        valentineQuestion.classList.add('hidden');
        successMessage.classList.remove('hidden');
        createExtraHearts();
    } else {
        pleaseBtn.classList.remove('hidden');
    }
}

// Create hearts animation
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const heartTypes = ['❤️', '💖', '💝', '💕', '💗'];
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

function createExtraHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// Create hearts regularly
setInterval(createHeart, 2000);

// Create initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 300);
}

// Add the moving No button functionality
document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.querySelector('#valentine-question button:nth-child(2)');
    
    if (noButton) {
        noButton.addEventListener('mouseover', function() {
            const maxX = window.innerWidth - this.offsetWidth;
            const maxY = window.innerHeight - this.offsetHeight;
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            this.style.position = 'fixed';
            this.style.left = randomX + 'px';
            this.style.top = randomY + 'px';
        });
    }

    let game = null;

    document.getElementById('play-game-btn').addEventListener('click', () => {
        console.log('Play game button clicked');
        const gameContainer = document.getElementById('game-container');
        gameContainer.classList.remove('hidden');
        
        const canvas = document.getElementById('gameCanvas');
        if (!game) {
            console.log('Creating new game instance');
            game = new Game(canvas);
            game.start();
        }
        
        // Request fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        }
        
        // Set initial canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.getElementById('exit-game').addEventListener('click', () => {
        const gameContainer = document.getElementById('game-container');
        gameContainer.classList.add('hidden');
        if (game) {
            game = null;
        }
        
        // Exit fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => {
                console.log('Error attempting to exit fullscreen:', err);
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});
