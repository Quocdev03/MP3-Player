window.addEventListener("load", function () {
   const song = document.querySelector("#song");
   const songName = document.querySelector(".song-name");
   const playButton = document.querySelector(".player-play");
   const prevButton = document.querySelector(".player-prev");
   const nextButton = document.querySelector(".player-next");
   const playerduration = document.querySelector(".player-duration");
   const remaining = document.querySelector(".player-remaining");
   const progressbar = document.querySelector("#progress-bar");
   const playerImage = document.querySelector(".player-image");
   let playing = true;
   const listMusic = ["holo.mp3", "summer.mp3", "home.mp3", "spark.mp3", "dreams.mp3", "WhereWeStarted.mp3"];
   const listSongName = ["Ampyx - Holo", "Last Summer", "Home", "Vexento - Spark", "Lost Sky - Dreams", "Lost Sky - Where We Started"];
   let songIndex = 0;
   playButton.addEventListener("click", handleMusicPlay);
   nextButton.addEventListener("click", function () {
      handleChangeMusic(1);
   });
   prevButton.addEventListener("click", function () {
      handleChangeMusic(-1);
   });
   // song.addEventListener("ended", function () {
   //    handleChangeMusic(1);
   // });
   // song.duration -> fulltime of song
   function handleChangeMusic(direction) {
      if (direction === 1) {
         // next music
         songIndex++;
         if (songIndex > listMusic.length - 1) {
            songIndex = 0;
            return;
         }
         // ListSongName[songIndex]
         songName.textContent = listSongName[songIndex];
         // list[songIndex]
         song.setAttribute("src", `./files/${listMusic[songIndex]}`);
         playing = true;
         handleMusicPlay();
      } else if (direction === -1) {
         songIndex--;
         if (songIndex < 0) {
            songIndex = listMusic.length - 1;
         }
         // ListSongName[songIndex]
         songName.textContent = listSongName[songIndex];
         // list[songIndex]
         song.setAttribute("src", `./files/${listMusic[songIndex]}`);
         playing = true;
         handleMusicPlay();
      }
   }
   function handleMusicPlay() {
      if (playing) {
         song.play();
         playerImage.classList.add("is-playing");
         playButton.classList.add("fa-pause");
         playing = false;
      } else {
         song.pause();
         playerImage.classList.remove("is-playing");
         playButton.classList.remove("fa-pause");
         playing = true;
      }
   }
   function displayTimer() {
      const { duration, currentTime } = song;
      progressbar.max = duration;
      progressbar.value = currentTime;
      // const duration = song.duration;
      // const currentTime = song.currentTime;
      remaining.textContent = formatTimer(currentTime);
      if (!duration) {
         playerduration.textContent = "0:00";
      } else {
         playerduration.textContent = formatTimer(duration);
      }
   }
   function formatTimer(number) {
      const minutes = Math.floor(number / 60);
      const seconds = Math.floor(number) - minutes * 60;
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
   }
   progressbar.addEventListener("change", handleDragProgressBar);
   function handleDragProgressBar() {
      song.currentTime = progressbar.value;
   }
   displayTimer();
   const timer = setInterval(displayTimer, 500);
});
//267