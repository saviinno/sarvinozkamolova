

function loadGame(){


        globalThis.box = document.getElementById("Box");
        globalThis.doBox = box.getContext("2d");
        //console.log(doBox);
        globalThis.ballRadius = 10;
        globalThis.x = box.width/2;
        globalThis.y = box.height-30;
        globalThis.dx = 2;
        globalThis.dy = -2;
        globalThis.paddleHeight = 10;
        globalThis.paddleWidth = 90;
        globalThis.paddleX = (box.width-paddleWidth)/2;
        globalThis.rightPressed = false;
        globalThis.leftPressed = false;
        globalThis.brickRowCount = 17;
        globalThis.brickColumnCount = 10;
        globalThis.brickWidth = 85;
        globalThis.brickHeight = 30;
        globalThis.brickPadding = 10;
        globalThis.brickOffsetTop = 30;
        globalThis.brickOffsetLeft = 30;
        globalThis.score = 0;
        globalThis.lives = 3;

        globalThis.bricks = [];
        for(var c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(var r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);
        draw();
}
    function keyDownHandler(e) {
        if(e.code  == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.code == 'ArrowRight') {
            rightPressed = false;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - box.offsetLeft;
        if(relativeX > 0 && relativeX < box.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount) {
                            alert("CONGRATUFLATIONS, YOU WON!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        doBox.beginPath();
        doBox.arc(x, y, ballRadius, 0, 10);
        doBox.fillStyle = "#94bbe9";
        doBox.fill();
        doBox.closePath();
    }
    function drawPaddle() {
        doBox.beginPath();
        doBox.rect(paddleX, box.height-paddleHeight, paddleWidth, paddleHeight);
        doBox.fillStyle = "#94bbe9";
        doBox.fill();
        doBox.closePath();
    }
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    doBox.beginPath();
                    doBox.rect(brickX, brickY, brickWidth, brickHeight);
                    doBox.fillStyle = "#94bbe9";
                    doBox.fill();
                    doBox.closePath();
                }
            }
        }
    }
    function drawScore() {
        doBox.font = "20px Arial, Bold";
        doBox.fillStyle = "#94bbe9";
        doBox.fillText("Your Score: "+score, 25, 20);
    }
    function drawLives() {
        doBox.font = "20px Arial";
        doBox.fillStyle = "#94bbe9";
        doBox.fillText("Lives Left: "+lives, box.width-150, 20);
    }

    function draw() {
        doBox.clearRect(0, 0, box.width, box.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        console.log(doBox);
        collisionDetection();

        if(x + dx > box.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > box.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("YOU LOST");
                    document.location.reload();
                }
                else {
                    x = box.width/2;
                    y = box.height-30;
                    dx = 2;
                    dy = -2;
                    paddleX = (box.width-paddleWidth)/2;
                }
            }
        }

        if(rightPressed && paddleX < box.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    //draw();