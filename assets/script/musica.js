const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: './assets/img/namawo.mp3',
        displayName: 'Namae wo Yobu yo',
        cover: './assets/img/yokohama.jpg',
        artist: 'Luck Life',
    },
    {
        path: './assets/img/scarlet+.mp3',
        displayName: 'Scarlet Sky',
        cover: './assets/img/bsd.jpeg',
        artist: 'Bungou Stray Dogs OST',
    },
    {
        path: './assets/img/suismoi.mp3',
        displayName: 'Suis Moi',
        cover: './assets/img/after.jpg',
        artist: 'Camille',
    },
    
    {
        path: './assets/img/tolove.mp3',
        displayName: 'Somebody To Love',
        cover: './assets/img/ear.jpg',
        artist: 'QUEEN',
    }
    ,
    {
        path: './assets/img/howls.mp3',
        displayName: 'Howl´s Moving Castle',
        cover: './assets/img/de.jpg',
        artist: 'Studio Ghibli',
    }
    ,
    {
        path: './assets/img/loveelvis.mp3',
        displayName: 'Can´t Falling in Love',
        cover: './assets/img/two.jpg',
        artist: 'Elvis Presley',
    },
    {
        path: './assets/img/lovefrank.mp3',
        displayName: 'LOVE',
        cover: './assets/img/1c.jpg',
        artist: 'Frank Sinatra',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);