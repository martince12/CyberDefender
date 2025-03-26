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

