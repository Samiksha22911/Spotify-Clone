let paly = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/3.mp3');

paly.addEventListener('click', () => {
    if(audio.paused || audio.currentTime == 0){
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else{
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progressBar = (audio.currentTime/audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `Linear-gradient(to right, #f1edef ${progress}%, #333 ${progress}%)`;
});

progressBar.addEventListener('input', function() {
    let value = this.value;
    this.style.background = `Linear-gradient(to right, #f1edef ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));
console.log(playMusic);

