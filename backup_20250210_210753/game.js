class Game {
    constructor(canvas) {
        console.log('Game initialization started');
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Set initial canvas size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(`Canvas size set to: ${this.canvas.width}x${this.canvas.height}`);

        // Draw a test rectangle to verify canvas is working
        this.ctx.fillStyle = '#ff69b4';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        console.log('Drew test rectangle');

        // Load images
        this.subhiCat = new Image();
        this.raghuCat = new Image();
        
        // Use simpler cat images
        this.subhiCat.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iI2ZmYjZjMSIvPjxjaXJjbGUgY3g9IjM1IiBjeT0iNDAiIHI9IjUiIGZpbGw9IiMwMDAiLz48Y2lyY2xlIGN4PSI2NSIgY3k9IjQwIiByPSI1IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTQwLDYwIFE1MCw3MCA2MCw2MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';
        this.raghuCat.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iI2ZmZDcwMCIvPjxjaXJjbGUgY3g9IjM1IiBjeT0iNDAiIHI9IjUiIGZpbGw9IiMwMDAiLz48Y2lyY2xlIGN4PSI2NSIgY3k9IjQwIiByPSI1IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTQwLDYwIFE1MCw3MCA2MCw2MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3N2Zz4=';
        
        console.log('Loading cat images...');

        // Initialize game state
        this.maze = MAZE_CONFIG.layout;
        console.log('Maze layout:', this.maze);
        
        // Calculate cell size based on screen size and maze dimensions
        const maxCellWidth = (window.innerWidth * 0.8) / this.maze[0].length;
        const maxCellHeight = (window.innerHeight * 0.8) / this.maze.length;
        this.cellSize = Math.min(maxCellWidth, maxCellHeight);
        console.log('Cell size:', this.cellSize);
        
        // Center the maze on screen
        this.offsetX = (window.innerWidth - (this.maze[0].length * this.cellSize)) / 2;
        this.offsetY = (window.innerHeight - (this.maze.length * this.cellSize)) / 2;
        console.log('Maze offset:', this.offsetX, this.offsetY);
        
        // Position cats
        this.subhi = {
            x: this.cellSize,
            y: this.cellSize,
            width: this.cellSize * 0.8,
            height: this.cellSize * 0.8,
            speed: this.cellSize / 8
        };

        // Position Raghu at bottom right
        this.raghu = {
            x: (this.maze[0].length - 2) * this.cellSize,
            y: (this.maze.length - 2) * this.cellSize,
            width: this.cellSize * 0.8,
            height: this.cellSize * 0.8
        };

        this.keys = {};
        this.gameWon = false;
        
        // Event listeners for keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            e.preventDefault(); // Prevent scrolling with arrow keys
            console.log('Key pressed:', e.key);
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
            e.preventDefault();
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log('Canvas resized:', this.canvas.width, this.canvas.height);

        // Recalculate cell size and positions
        const maxCellWidth = (window.innerWidth * 0.8) / this.maze[0].length;
        const maxCellHeight = (window.innerHeight * 0.8) / this.maze.length;
        this.cellSize = Math.min(maxCellWidth, maxCellHeight);

        // Update offsets
        this.offsetX = (window.innerWidth - (this.maze[0].length * this.cellSize)) / 2;
        this.offsetY = (window.innerHeight - (this.maze.length * this.cellSize)) / 2;

        // Update character sizes and positions
        this.subhi.width = this.cellSize * 0.8;
        this.subhi.height = this.cellSize * 0.8;
        this.subhi.speed = this.cellSize / 8;

        this.raghu.width = this.cellSize * 0.8;
        this.raghu.height = this.cellSize * 0.8;
    }

    draw() {
        console.log('Drawing frame');
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        this.ctx.fillStyle = '#fff5f8';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw maze
        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                if (this.maze[y][x] === 1) {
                    this.ctx.fillStyle = MAZE_CONFIG.wallColor;
                    this.ctx.fillRect(
                        this.offsetX + x * this.cellSize,
                        this.offsetY + y * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                }
            }
        }

        try {
            // Draw Subhi
            this.ctx.drawImage(
                this.subhiCat,
                this.offsetX + this.subhi.x,
                this.offsetY + this.subhi.y,
                this.subhi.width,
                this.subhi.height
            );

            // Draw Raghu
            this.ctx.drawImage(
                this.raghuCat,
                this.offsetX + this.raghu.x,
                this.offsetY + this.raghu.y,
                this.raghu.width,
                this.raghu.height
            );
        } catch (error) {
            console.error('Error drawing cats:', error);
            // Fallback to colored rectangles if images fail
            this.ctx.fillStyle = '#ffb6c1';
            this.ctx.fillRect(
                this.offsetX + this.subhi.x,
                this.offsetY + this.subhi.y,
                this.subhi.width,
                this.subhi.height
            );

            this.ctx.fillStyle = '#ffd700';
            this.ctx.fillRect(
                this.offsetX + this.raghu.x,
                this.offsetY + this.raghu.y,
                this.raghu.width,
                this.raghu.height
            );
        }

        // Draw name tags
        this.ctx.fillStyle = '#ff69b4';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        
        // Draw Subhi's name tag
        this.ctx.fillText(
            'Subhi', 
            this.offsetX + this.subhi.x + this.subhi.width / 2,
            this.offsetY + this.subhi.y - 10
        );

        // Draw Raghu's name tag
        this.ctx.fillText(
            'Raghu',
            this.offsetX + this.raghu.x + this.raghu.width / 2,
            this.offsetY + this.raghu.y - 10
        );
    }

    update() {
        if (this.gameWon) return;

        let newX = this.subhi.x;
        let newY = this.subhi.y;

        // Move Subhi based on keyboard input
        if (this.keys['ArrowUp']) newY -= this.subhi.speed;
        if (this.keys['ArrowDown']) newY += this.subhi.speed;
        if (this.keys['ArrowLeft']) newX -= this.subhi.speed;
        if (this.keys['ArrowRight']) newX += this.subhi.speed;

        // Check collision with walls
        const mazeX = newX + this.offsetX;
        const mazeY = newY + this.offsetY;

        const cellX = Math.floor(mazeX / this.cellSize);
        const cellY = Math.floor(mazeY / this.cellSize);

        if (cellY >= 0 && cellY < this.maze.length && 
            cellX >= 0 && cellX < this.maze[0].length && 
            this.maze[cellY][cellX] === 0) {
            this.subhi.x = newX;
            this.subhi.y = newY;
        }

        // Check if Subhi found Raghu
        const distance = Math.sqrt(
            Math.pow((this.subhi.x - this.raghu.x), 2) + 
            Math.pow((this.subhi.y - this.raghu.y), 2)
        );

        if (distance < this.cellSize) {
            console.log('Game won!');
            this.gameWon = true;
            document.getElementById('win-message').classList.remove('hidden');
        }
    }

    gameLoop() {
        this.update();
        this.draw();
        if (!this.gameWon) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    start() {
        console.log('Game starting...');
        // Draw initial frame immediately
        this.draw();
        // Start game loop
        this.gameLoop();
    }
}
