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
            easing: 'easeOutQuad',
            update: function(anim) {
                powerShieldBar.style.width = `${newWidthPercent}%`;
            }
        });

        if (scenario.isSafe) {
            showFeedback("✓ Correct! This photo is safe.", "green");
        } else {
            showFeedback("✓ Correct! This photo is NOT safe.", "green");
        }
        SafeImage();
    } else {
        if (scenario.isSafe) {
            showFeedback("✗ Wrong! This photo was actually safe.", "red");
        } else {
            showFeedback("✗ Wrong! This photo was dangerous.", "red");
        }
        NotSafeImage();
    }
}
function endGame() {
    powerShieldBar.style.width = `${maxShieldWidth}px`;
    
    setTimeout(() => {
        const percentage = Math.round((score / scenarios.length) * 100);
        showFeedback(`Game Over! Final Score: ${score}/${scenarios.length} (${percentage}%)`, 
                    percentage > 50 ? "green" : "red");
        
        messageContent.innerHTML += `<br><button id="restart-btn" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: ${percentage > 50 ? '#4CAF50' : '#f44336'};
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-family: 'Share Tech Mono';
        ">Play Again</button>`;
        
        document.getElementById('restart-btn').addEventListener('click', resetGame);
    }, 500);
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


function showFeedback(message, color) {
    messageContent.textContent = message;
    messageContent.style.color = color;
    messagePlace.style.display = 'flex';
    messagePlace.style.borderColor = color;
    
    
    safeBtn.disabled = true;
    notSafeBtn.disabled = true;
}


closeMessageBtn.addEventListener('click', function() {
    messagePlace.style.display = 'none';
    safeBtn.disabled = false;
    notSafeBtn.disabled = false;
});


function SafeImage() {
    setTimeout(() => {
        currentScenario++;
        if(currentScenario < scenarios.length) {
            showScenario();
        } else {
            endGame();
        }
    }, 500); // Reduced delay since we wait for message close
}

function NotSafeImage() {
    setTimeout(() => {
        currentScenario++;
        if(currentScenario < scenarios.length) {
            showScenario();
        } else {
            endGame();
        }
    }, 500); // Reduced delay since we wait for message close
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
        title: "Welcome, Cyber Defender!",
        text: "The internet needs your help against cyber threats!"
    },
    {
        title: "Your Mission",
        text: "Identify fake news, block cyberbullies, and stop scams to earn points."
    },
    {
        title: "How To Play",
        text: "1. Click on dangerous content\n2. Report suspicious messages\n3. Earn stars for correct answers"
    },
    {
        title: "Ready?",
        text: "Let's make the internet safer together!"
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
        nextButton.textContent = "Start Game"
    }else {
        nextButton.textContent = "Continue"
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
