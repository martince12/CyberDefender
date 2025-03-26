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
        }
    });
}

updateSlide();
