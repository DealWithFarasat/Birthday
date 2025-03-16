document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.querySelector(".envelope");
    const cake = document.querySelector(".cake");

    if (envelope && !envelope.classList.contains("open")) {
        envelope.addEventListener("click", function () {
            this.classList.remove("new");
            this.classList.add("open");

            // Show the cake after opening the envelope
            if (cake) {
                cake.style.display = 'block';
            }

            // Start confetti
            startConfetti();
        });
    }

    function startConfetti() {
        const confettiCanvas = document.createElement("canvas");
        confettiCanvas.style.position = "fixed";
        confettiCanvas.style.top = "0";
        confettiCanvas.style.left = "0";
        confettiCanvas.style.width = "100vw";
        confettiCanvas.style.height = "100vh";
        confettiCanvas.style.pointerEvents = "none";
        document.body.appendChild(confettiCanvas);

        const ctx = confettiCanvas.getContext("2d");
        const confettiPieces = [];
        
        function createConfetti() {
            for (let i = 0; i < 10; i++) { // Keep generating new confetti
                confettiPieces.push({
                    x: -10, // Start from the left side
                    y: Math.random() * window.innerHeight,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    sizeX: Math.random() * 8 + 3,
                    sizeY: Math.random() * 3 + 2,
                    speedX: Math.random() * 3 + 2,
                    speedY: Math.random() * 2 - 1,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 5 - 2.5
                });
            }
        }
        
        function drawConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiPieces.forEach((piece, index) => {
                ctx.fillStyle = piece.color;
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillRect(-piece.sizeX / 2, -piece.sizeY / 2, piece.sizeX, piece.sizeY);
                ctx.restore();
                piece.x += piece.speedX;
                piece.y += piece.speedY;
                piece.rotation += piece.rotationSpeed;
                
                if (piece.x > window.innerWidth) {
                    confettiPieces.splice(index, 1); // Remove confetti that moves out of the screen
                }
            });
        }

        function update() {
            createConfetti();
            drawConfetti();
            requestAnimationFrame(update);
        }

        update();
    }
});