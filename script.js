document.addEventListener("DOMContentLoaded", ()=> {
  let flowers = ["./img/flower1.png", "./img/flower2.png", "./img/flower3.png"]; // массив изображений цветов
  let score = 0; // счетчик пойманных цветов
 let playerPosition = 0;
  let missedFlowers = 0; // количество упущенных цветов
  let gameArea = document.getElementById('gameArea');// область игры
  let basket = document.getElementById('basket'); // корзина
  let gameInterval = setInterval(dropFlower, 2000); // интервал появления новых цветов
  function dropFlower() {
    let randomFlower = flowers[Math.floor(Math.random() * flowers.length)]; // выбор случайного цветка
    let flower = document.createElement('img');
    flower.setAttribute('src', randomFlower);
    flower.setAttribute('class', 'flower');
    flower.style.left = Math.floor(Math.random() * 450) + 'px'; // случайное положение по горизонтали
    gameArea.appendChild(flower);
    moveFlower(flower);
  }
  let button = document.createElement('button');
  button.className = 'new-game';
  button.textContent = 'Новая игра'
  console.log(basket)
  function moveFlower(flower) {
    let topPosition = 0;
    let successful = document.getElementById('number-of-successful');
    let unsuccessful = document.getElementById('number-of-unsuccessful');
    let contBut = document.getElementById('container-but');
    let flowerInterval = setInterval(()=> {
        if (topPosition < 450) {
            topPosition += 10;
            flower.style.top = topPosition + 'px'; // движение цветка вниз
            if (checkCollision(flower, basket)) {
                clearInterval(flowerInterval);
                flower.remove();
                score++;
                successful.textContent = ("Счет: " + score);
            }
        } else {
            clearInterval(flowerInterval);
            flower.remove();
            missedFlowers++;
            unsuccessful.textContent = ("Пропущено: " + missedFlowers);
            if (missedFlowers > 10) {
                clearInterval(gameInterval);
                unsuccessful.textContent = "Игра окончена!";
                unsuccessful.style = "color: var(--color5)";
                
                contBut.insertAdjacentElement(
                  "beforeend", button )
                button.addEventListener('click', ()=>{
                  location.reload();
                })
            }
        }
    }, 100);
  }
  function checkCollision(flower, basket) {
    let flowerRect = flower.getBoundingClientRect();
    let basketRect = basket.getBoundingClientRect();
    return (
        flowerRect.left < basketRect.right &&
        flowerRect.right > basketRect.left &&
        flowerRect.bottom > basketRect.top &&
        flowerRect.top < basketRect.bottom
    );
  }

  // Управление корзиной
  function movePlayer(direction) {
    if (direction === 'left' && playerPosition > 0) {
      playerPosition -= 10;
    }
    else if(direction === 'right' && playerPosition < 450){
      playerPosition += 10;
    }
    basket.style.left =playerPosition + 'px'
  }

  document.addEventListener('keydown', (event)=>{
    if(event.key === 'ArrowLeft'){
      movePlayer('left');
    }
    else if(event.key === 'ArrowRight'){
      movePlayer('right');
    }
  });
});