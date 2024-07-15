console.log("Welcome to Spotify");

// Variable Initialization
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById('gif');
let songsItem = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let masterDuration = document.getElementById('masterDuration');
let initialDuration = document.getElementById('initailDuration');
let masterImg = document.getElementById('masterImg');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let masterPlay = document.getElementById('masterPlay');

let songs = [
    { songName: "Jubin Nautiyal Lut Gaye", filePath: "songs/1.mp3", duration: "3:48", coverPath: "covers/1.png" },
    { songName: "Dua-Lipa Levitating", filePath: "songs/2.mp3", duration: "3:58", coverPath: "covers/2.png" },
    { songName: "Tum_Se_Hi_Dil", filePath: "songs/3.mp3", duration: "5:23", coverPath: "covers/3.png" },
    { songName: "Teri Baaton Mein", filePath: "songs/4.mp3", duration: "2:33", coverPath: "covers/4.png" },
    { songName: "Thoda Thoda Pyaar", filePath: "songs/5.mp3", duration: "4:32", coverPath: "covers/5.png" },
    { songName: "Mujhe Peene Do ", filePath: "songs/6.mp3", duration: "3:16", coverPath: "covers/6.png" },
    { songName: "Tera_Hone_Laga_Hoon", filePath: "songs/7.mp3", duration: "5:00", coverPath: "covers/7.png" },
    { songName: "Hale Dil - Murder 2", filePath: "songs/8.mp3", duration: "5:48", coverPath: "covers/8.png" },
    { songName: "Oh-Antava-Mava", filePath: "songs/9.mp3", duration: "3:43", coverPath: "covers/9.png" },
    { songName: "Kajra Re", filePath: "songs/10.mp3", duration: "7:54", coverPath: "covers/10.png" }
];

songsItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('songDuration')[0].innerText = songs[i].duration;
});

// Handle play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        makesAllPlay();
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Handle play / pause of listSongs
const makesAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};

const updateMasterClass = () => {
    masterSongName.innerText = songs[songIndex].songName;
    masterDuration.innerText = songs[songIndex].duration;
    masterImg.src = songs[songIndex].coverPath;
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makesAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        updateMasterClass();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    });
});

next.addEventListener('click', () => {
    
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    
    audioElement.src = songs[songIndex].filePath;
    updateMasterClass();
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makesAllPlay();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
});

previous.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath;
    updateMasterClass();
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makesAllPlay();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
});

audioElement.addEventListener('timeupdate', () => {
    // Update progressBar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;

    // Update the initial duration
    initialDuration.textContent = formatTime(audioElement.currentTime);
    
    if (progress === 100) {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

// Format time in minutes and seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Update master duration when metadata is loaded
audioElement.addEventListener('loadedmetadata', () => {
    masterDuration.textContent = formatTime(audioElement.duration);
});
