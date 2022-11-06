// Bottom items Selection -->
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let masterSongName = document.getElementById("masterSongName");

// songBox items Selection
let songCover = document.getElementsByClassName("songCover");
let songName = document.getElementsByClassName("songName");
let timeStamp = document.getElementsByClassName("timeStamp");

// Array of Songs Data

let myMusic = [
  {
    songName: "8 Parche - Baani Sandhu",
    filePath: "myMusic/8 Parche - Baani Sandhu.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "52 Gaj Ka Daman_320(PaglaSongs)",
    filePath: "myMusic/52 Gaj Ka Daman_320(PaglaSongs).mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Achha-Lagta-Hai-Shreya-Ghoshal,Mohit-Chauhan",
    filePath: "myMusic/Achha-Lagta-Hai-Shreya-Ghoshal,Mohit-Chauhan.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Awari Ek Villain Dub Chillout-(Mr-Jatt.com)",
    filePath: "myMusic/Awari Ek Villain Dub Chillout-(Mr-Jatt.com).mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Chhod Denge_320(PagalWorld.com.se)",
    filePath: "myMusic/Chhod Denge_320(PagalWorld.com.se).mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Ek Raat-(Mr-Jatt.com)",
    filePath: "myMusic/Ek Raat-(Mr-Jatt.com).mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "gulaal-Aarambh hai Prachand",
    filePath: "myMusic/gulaal-Aarambh hai Prachand.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Kale Je Libaas(PagalWorld.com.se)",
    filePath: "myMusic/Kale Je Libaas(PagalWorld.com.se).mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Mere Bhai Mere Yaar Sare Nare Hathiyar ",
    filePath:
      "myMusic/Mere Bhai Mere Yaar Sare Nare Hathiyar Sumit GoswamiPrivateSong 2019.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Panghat(PaglaSongs)",
    filePath: "myMusic/Panghat(PaglaSongs).mp3",
    coverPath: "covers/10.jpg",
  },
];

// Other variable Declrations -->

let songIndex = 0;
let audioElement = new Audio(myMusic[songIndex].filePath);
masterSongName.innerHTML = myMusic[songIndex].songName;
myProgressBar.value = 0;

// ========================== //

myMusic.forEach((song, i) => {
  // songLists Load in Html

  let songLists = document.getElementById("songLists");
  songLists.innerHTML += `<div class="songItem">
                                        <img src="" alt="Cvr" class="songCover">
                                        <span class="songName">Here is song Name</span>
                                        <span class = "songlistPlay"><span class="timeStamp">00:00</span>
                                        <i class=" songItemPlay fa-solid fa-circle-play" "></i>
                                        </span>
                                        </div>`;

  // song's details Updation

  songCover[i].src = myMusic[i].coverPath;
  songName[i].innerHTML = myMusic[i].songName;
  let songTime = new Audio(myMusic[i].filePath);
  songTime.addEventListener("loadeddata", () => {
    let dur = songTime.duration;
    minute = Math.floor(dur / 60);
    second = Math.floor(dur - minute * 60);
    if (second < 10) {
      second = "0" + minute;
    }
    timeStamp[i].innerText = minute + ":" + second;
  });
});

//// Function for songs Play and Pause Etc. ////

let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));

const makeAllPlays = () => {
  songItemPlay.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

const makeSongPlay = () => {
  audioElement.play();
  gif.style.opacity = 1;
  makeAllPlays();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  songItemPlay[songIndex].classList.remove("fa-play-circle");
  songItemPlay[songIndex].classList.add("fa-pause-circle");
};

const makeSongPause = () => {
  audioElement.pause();
  gif.style.opacity = 0;
  makeAllPlays();
  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
  songItemPlay[songIndex].classList.remove("fa-pause-circle");
  songItemPlay[songIndex].classList.add("fa-play-circle");
};

const songChange = () => {
  audioElement.src = myMusic[songIndex].filePath;
  masterSongName.innerText = myMusic[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.pause();
};

// Song play and Pause button Settings...

songItemPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    let Ind = songItemPlay.indexOf(element);
    // console.log(Ind);
    if (songIndex == Ind) {
      if (audioElement.paused) {
        makeSongPlay();
      } else {
        makeSongPause();
      }
    } else {
      songIndex = Ind;
      songChange();
      makeSongPlay();
    }
  });
});

//// Handle play/pause click /////

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    makeSongPlay();
  } else {
    makeSongPause();
  }
});

// Progress Bar Updation

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Listen to Events

audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Next and Back Forward Button
const makeSongNext = () => {
  if (songIndex >= myMusic.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  songChange();
  makeSongPlay();
};

const makeSongBack = () => {
  if (songIndex <= 0) {
    songIndex = myMusic.length - 1;
  } else {
    songIndex -= 1;
  }
  songChange();
  makeSongPlay();
};

document.getElementById("next").addEventListener("click", () => {
  makeSongNext();
});

document.getElementById("previous").addEventListener("click", () => {
  makeSongBack();
});

// other Function --->

audioElement.addEventListener("ended", () => {
  makeSongNext();
});

document.addEventListener("keypress", (e) => {
  if (e.key === "f") {
    if (audioElement.paused) {
      makeSongPlay();
    } else {
      makeSongPause();
    }
  }
});
