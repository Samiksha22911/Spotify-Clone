let playBtn = document.getElementById('play');
let progressBar = document.getElementById('progressBar');

// SONG DATA
let songs = [
    { id: 3, name: "DIE FOR YOU", artist: "The Weeknd", file: "Audio/3.mp3", cover: "images/3.jfif" },
    { id: 4, name: "UNHOLY", artist: "Sam Smith", file: "Audio/4.mp3", cover: "images/4.jfif" },
    { id: 5, name: "COLLIDE", artist: "Justine Skye", file: "Audio/5.mp3", cover: "images/5.jfif" },
    { id: 6, name: "GOOD FOR YOU", artist: "Selena Gomez", file: "Audio/6.mp3", cover: "images/6.jfif" },
    { id: 7, name: "MOCKINGBIRD", artist: "Eminem", file: "Audio/7.mp3", cover: "images/7.jfif" },
    { id: 8, name: "THE FATE OF OPHELIA", artist: "Taylor Swift", file: "Audio/8.mp3", cover: "images/8.jfif" },
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].file);

// PLAY / PAUSE BUTTON
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    } else {
        audio.pause();
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
    }
});

// CLICK ON SONG
let playMusic = Array.from(document.getElementsByClassName('playMusic'));

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {

        let songId = parseInt(e.target.id);
        let selectedSong = songs.find(song => song.id === songId);

        // Safety check
        if (!selectedSong) {
            console.log("Song not found!");
            return;
        }

        currentSongIndex = songs.indexOf(selectedSong);

        audio.src = selectedSong.file;
        audio.currentTime = 0;
        audio.play();

        // Update play button
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');

        // Update UI
        document.querySelector('.img-title-info').innerText = selectedSong.name;
        document.querySelector('.img-des-info').innerText = selectedSong.artist;
        document.querySelector('.player-bar img').src = selectedSong.cover;
    });
});

// PROGRESS BAR UPDATE
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        let progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    }
});

// SEEK FUNCTION
progressBar.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});