window.addEventListener("load", function () {
   const song = document.querySelector("#song");
   const playButton = document.querySelector(".player-play");
   const prevButton = document.querySelector(".player-prev");
   const nextButton = document.querySelector(".player-next");
   const playerduration = document.querySelector(".player-duration");
   const remaining = document.querySelector(".player-remaining");
   const bar = document.querySelector("#progress-bar");
   const playerImage = document.querySelector(".player-image");
   let playing = true;
   const list = ["holo.mp3", "summer.mp3", "home.mp3", "spark.mp3", "dreams.mp3", "WhereWeStarted.mp3"];
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
         if (songIndex > list.length - 1) {
            songIndex = 0;
            return;
         }
         // list[songIndex]
         song.setAttribute("src", `./files/${list[songIndex]}`);
         playing = true;
         handleMusicPlay();
      } else if (direction === -1) {
         songIndex--;
         if (songIndex < 0) {
            songIndex = list.length - 1;
         }
         // list[songIndex]
         song.setAttribute("src", `./files/${list[songIndex]}`);
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
      // const duration = song.duration;
      // const currentTime = song.currentTime;
      const { duration, currentTime } = song;
      const minutes = Math.floor(Math.ceil(duration) / 60);
      const second = parseInt(duration) - minutes * 60;
      playerduration.textContent = `${minutes}:${second}`;
   }
   const timer = setInterval(displayTimer, 1000);
});