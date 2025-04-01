const scenarios = [
    {
        image: "FakeImg1.png",
        isSafe: false,
    },
    {
        image: "FakeImg2.png",
        isSafe: false,
    },
    {
        image: "FakeImg1.png",
        isSafe: false,
    },
    {
        image: "FakeImg2.png",
        isSafe: false,
    }
];

let currentScenario = 0;
let score = 0;

const imageElement = document.getElementById('image-scenario');
const safeBtn = document.getElementById('safe-btn');
const notSafeBtn = document.getElementById('notsafe-btn');
const powerShieldBar = document.getElementById('PS-bar');
const maxShieldWidth = document.getElementById('PS-bar-container').offsetWidth;
let shieldProgress = maxShieldWidth * 0.1;
powerShieldBar.style.width = `${shieldProgress}px`;
const shieldIncrement = (maxShieldWidth * 0.9) / scenarios.length;
const closeMessageBtn = document.getElementById('close-message')
const messageContent = document.getElementById('message');
const messagePlace = document.getElementById('message-place');

function showScenario(){
    imageElement.style.backgroundImage = `url('images/${scenarios[currentScenario].image}')`;
}

function initialShieldPump() {
    anime({
        targets: '#PS-bar',
        scaleX: 1.2,
        duration: 300,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        complete: function() {
            powerShieldBar.style.transform = 'scaleX(1)';
        }
    });
}

function checkAnswer(isSafeChoice) {
    const scenario = scenarios[currentScenario];
    const isCorrect = isSafeChoice === scenario.isSafe;

    if (isCorrect) {
        score++;
        const newWidthPercent = (score / scenarios.length) * 100;
        
        anime({
            targets: '#PS-bar',
            width: `${newWidthPercent}%`,
            duration: 500,
            easing: 'easeOutQuad'
        });

        if (scenario.isSafe) {
            showFeedback("✓ Точно! Оваа слика е безбедна.", "green", false, () => {
                SafeImage();
            });
        } else {
            showFeedback("✓ Точно! Оваа слика не е безбедна.", "green", false, () => {
                SafeImage();
            });
        }
    } else {
        if (scenario.isSafe) {
            showFeedback("✗ Неточно! Оваа слика е безбедна.", "red", false, () => {
                NotSafeImage();
            });
        } else {
            showFeedback("✗ Неточно! Оваа слика е небезбедна.", "red", false, () => {
                NotSafeImage();
            });
        }
    }
}

function endGame() {
    powerShieldBar.style.width = `${maxShieldWidth}px`;
    const percentage = Math.round((score / scenarios.length) * 100);
    
    showFeedback(`Крај на игра! Финален резултат: ${score}/${scenarios.length} (${percentage}%)`, 
                percentage > 50 ? "green" : "red", true);
    
    messageContent.innerHTML += `<br><button id="restart-btn" style="
        padding: 0.5rem 1rem;
        background: ${percentage > 50 ? '#4CAF50' : '#f44336'};
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-family: 'Tektur';
        font-size: 0.8rem;
    ">Играј Повторно</button>`;
    
    document.getElementById('restart-btn').addEventListener('click', resetGame);
}
function resetGame() {
    currentScenario = 0;
    score = 0;
    shieldProgress = maxShieldWidth * 0.1;
    powerShieldBar.style.width = `${shieldProgress}px`;
    messagePlace.style.display = 'none'; 
    safeBtn.disabled = false;
    notSafeBtn.disabled = false;
    showScenario();
    initialShieldPump();
}

function showFeedback(message, color, isEndGame = false, callback = null) {
    messageContent.textContent = message;
    messageContent.style.color = color;
    messagePlace.style.display = 'flex';
    messagePlace.style.borderColor = color;
    
    safeBtn.disabled = true;
    notSafeBtn.disabled = true;

    if(!isEndGame){
        setTimeout(() => {
            messagePlace.style.display = 'none';
            safeBtn.disabled = false;
            notSafeBtn.disabled = false;
            if(callback) callback(); 
        }, 2000);
    }
}


function SafeImage() {
    currentScenario++;
    if(currentScenario < scenarios.length) {
        showScenario();
    } else {
        endGame();
    }
}

function NotSafeImage() {
    currentScenario++;
    if(currentScenario < scenarios.length) {
        showScenario();
    } else {
        endGame();
    }
}

safeBtn.addEventListener('click', () => checkAnswer(true));
notSafeBtn.addEventListener('click', () => checkAnswer(false));


var section1 = document.getElementById("load-page");


function animateProgressBar(targetPercent, duration = 3000){
    anime({
        targets: '#progress-bar',
        width: targetPercent+"%",
        easing: 'easeInOutQuad',
        duration: duration,
        update: function(anim){
            document.getElementById('percent').textContent = 
            Math.round(anim.progress * targetPercent / 100) + "%"
        },
        complete: function(){
            anime({
                targets: '#load-page',
                opacity: 0,
                duration: 600,
                easing: 'easeInOutQuad',
                complete: function(){
                    document.getElementById('load-page').style.display = 'none';
                    document.getElementById('intro-page').style.display = 'flex';
                }
            })
        } 
    });
}

animateProgressBar(100);


const introSlides = [
    {
        title: "Добредојде, Сајбер Заштитнику!",
        text: "На интернетот му е потребна твојата помош против сајбер закани!"
    },
    {
        title: "Твојата Мисија",
        text: "Откривај лажни вести, спречувај сајбер малтретирање и запознај ги измамите за да освојуваш поени."
    },
    {
        title: "Како да Играш",
        ttext: "1. Одлучи дали содржината е безбедна или небезбедна\n2. Кликни на соодветното копче (Безбедно/Небезбедно)\n3. Добиваш поени за точни одговори"
    },
    {
        title: "Подготвен?",
        text: "Да го направиме интернетот позаштитен заедно!"
    }
];

let currentSlide = 0;
const nextButton = document.getElementById('button-next');
const titleElement = document.getElementById('title-text-container');
const textElement = document.getElementById('paragraph-text-container');

function updateSlide(){
    titleElement.textContent = introSlides[currentSlide].title;
    textElement.textContent = introSlides[currentSlide].text;

    if(currentSlide === introSlides.length -1){
        nextButton.textContent = "Започни"
    }else {
        nextButton.textContent = "Продолжи"
    }

    nextButton.addEventListener('click', function(){
        currentSlide++;

        if(currentSlide< introSlides.length){
            anime({
                targets: '#text-container',
                opacity: 0,
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function(){
                    updateSlide();
                    anime({
                        targets: '#text-container',
                        opacity: 1,
                        duration: 300
                    });
                }
            });
        }else{
            document.getElementById('intro-page').style.display = 'none';
            document.getElementById('main-page').style.display = 'flex';
            showScenario();
        }
    });
}



updateSlide();
