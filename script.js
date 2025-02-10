document.addEventListener('DOMContentLoaded', () => {
    // Get elements from both pages
    const firstPage = document.getElementById('first-page');
    const valentinePage = document.getElementById('valentine-page');
    const identityYesBtn = document.getElementById('identityYesBtn');
    const identityNoBtn = document.getElementById('identityNoBtn');
    const identityMessage = document.getElementById('identity-message');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('message');
    const celebration = document.getElementById('celebration');
    const loveLetter = document.querySelector('.love-letter');
    const typingText = document.querySelector('.typing-text');
    const continueLetter = document.getElementById('continueLetter');
    const mainContent = document.querySelector('.main-content');
    const musicBtn = document.getElementById('toggleMusic');
    const bgMusic = document.getElementById('bgMusic');
    const heartsContainer = document.querySelector('.hearts-container');
    const catContainer = document.getElementById('cat-container');

    // Love letter content
    const letterContent = `I wanted to take a moment to tell you how special you are to me. Your smile brightens my day, and your presence makes everything better. You're not just my Valentine, you're my favorite person in the whole world! ❤️`;
    let letterIndex = 0;

    // Music control
    let isMusicPlaying = false;
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    // Create hearts periodically
    setInterval(createHeart, 300);

    // First page interactions
    identityYesBtn.addEventListener('click', () => {
        firstPage.style.display = 'none';
        valentinePage.style.display = 'block'; // Show the Valentine's page
    });

    identityNoBtn.addEventListener('click', () => {
        identityMessage.textContent = "Sorry, this page is only for Subhiii! ❤️";
        identityMessage.style.color = '#e91e63';
    });

    // Typewriter effect for love letter
    function typeWriter() {
        if (letterIndex < letterContent.length) {
            typingText.textContent += letterContent.charAt(letterIndex);
            letterIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // Continue to main valentine content
    continueLetter.addEventListener('click', () => {
        loveLetter.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Valentine's page interactions
    yesBtn.addEventListener('click', () => {
        const confetti = document.createElement('script');
        confetti.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
        document.head.appendChild(confetti);
        
        confetti.onload = () => {
            // Celebration animation
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            // Navigate to cat page with fade effect
            document.body.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => {
                window.location.href = 'cat.html';
            }, 1000);
        };
    });

    const noButton = document.getElementById('noBtn');

    // Enhanced No button movement
    function moveNoButton(event) {
        const button = event.target;
        const buttonRect = button.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        // Calculate distance between mouse and button center
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        const distance = Math.sqrt(
            Math.pow(mouseX - buttonCenterX, 2) + 
            Math.pow(mouseY - buttonCenterY, 2)
        );
        
        // If mouse is within 100px of button, move it away
        if (distance < 100) {
            const moveX = (Math.random() - 0.5) * 200;
            const moveY = (Math.random() - 0.5) * 200;
            
            // Ensure button stays within viewport
            const newX = Math.min(Math.max(0, buttonRect.left + moveX), window.innerWidth - buttonRect.width);
            const newY = Math.min(Math.max(0, buttonRect.top + moveY), window.innerHeight - buttonRect.height);
            
            button.style.position = 'fixed';
            button.style.left = newX + 'px';
            button.style.top = newY + 'px';
            
            // Add some rotation for fun
            button.style.transform = `rotate(${(Math.random() - 0.5) * 45}deg)`;
        }
    }

    // Move the 'No' button when the mouse is near it
    noButton.addEventListener('mousemove', moveNoButton);

    // Disable the 'No' button quickly
    noBtn.disabled = true;

    // Create Memories Together button on cat GIF page
    const memoriesButton = document.createElement('button');
    memoriesButton.innerText = 'Memories Together';
    document.getElementById('cat-gif-page').appendChild(memoriesButton);

    memoriesButton.addEventListener('click', () => {
        window.location.href = 'memories.html'; // Redirect to memories page
    });

    // On the cat GIF page, add an 'Us' button
    const usButton = document.createElement('button');
    usButton.innerText = 'Us';
    usButton.addEventListener('click', function() {
        document.body.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            window.location.href = 'photos.html'; // Redirect to photos page
        }, 1000);
    });
    document.getElementById('cat-gif-page').appendChild(usButton);

    // Photo Gallery Interaction
    const memoryBoxes = document.querySelectorAll('.memory-box');
    memoryBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const img = box.querySelector('img');
            if (img) {
                // Create fullscreen preview
                const preview = document.createElement('div');
                preview.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    cursor: pointer;
                `;
                
                const previewImg = document.createElement('img');
                previewImg.src = img.src;
                previewImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 10px;
                `;
                
                preview.appendChild(previewImg);
                document.body.appendChild(preview);
                
                // Close on click
                preview.addEventListener('click', () => {
                    preview.remove();
                });
            }
        });
    });
});
