// get songs from folder 
async function getsongs() {

    let song = await fetch("http://127.0.0.1:5500/Spotifyclone/songs/");

    let response = await song.text();
    let div = document.createElement("div");
    //create element div put res on it
    div.innerHTML = response;
    //get link using anchatech "a"
    let link = div.getElementsByTagName("a");
    let songs = [];//array of songs
    for (let i = 0; i < link.length; i++) {
        let href = link[i].href;// this give  link of songs
        if (href.endsWith(".mp3")) {
            songs.push(href);//this push link in array
        }
    }
    return songs;
}

async function main() {
    let songs = await getsongs();
    console.log(songs);
    //to play audio
    var audio = new Audio(songs[0]);
    let currentsong=new Audio();
    //audio.play();
    // let btn = document.getElementsByClassName("play-btn")
    // audio.play();
    // let c=document.querySelector(".card");
    let card = document.querySelectorAll(".play-btn");
    let songname = document.querySelector(".songname");
    let songtime = document.querySelector(".songtime");
    let playbtn = document.querySelector(".playbarbtn");
    let next = document.querySelector(".next");
    let cardarr = Array.from(card);
    console.log(cardarr);
    //play all songs 
    // let audios = [];
    let currentSource;
    let currentAudio = new Audio();
    let currentIndex = null;
    let currentLibraryButton = null;
    let librayAudio=new Audio();
    let currentliIndex=null;
    // for (let i = 0; i < songs.length; i++) {
    //     audios[i] = new Audio(songs[i]);
    // }

    for (let i = 0; i < cardarr.length; i++) {

        cardarr[i].addEventListener("click", () => {
            //if library song are playing and user click normal card song then change library card button
        if (currentLibraryButton !== null) {
            currentLibraryButton.src = "images/play.svg";
            currentLibraryButton = null;
               librayAudio.pause();
              currentSource="cardsongs";
        }
        currentSource="cardsongs";
            // let currentAudio = audios[i];

            console.log("Card clicked:", i);
            console.log("Song:", songs[i]);

            // If clicking the SAME song
            if (currentIndex === i) {

                if (currentAudio.paused) {
                    currentAudio.play();
                    cardarr[i].textContent = "⏸";
                    playbtn.textContent = "⏸";
                     cardarr[i].closest(".card").classList.add("playing");
                    // songname.textContent = songs[i].split("/songs/")[1].replaceAll("%20", " ");

                } else {
                    currentAudio.pause();
                    cardarr[i].textContent = "▶";
                    playbtn.textContent = "▶";
                      cardarr[i].closest(".card").classList.remove("playing");
                }

                return;
            }
            // Stop previous song
            if (currentAudio !== null) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                    if (currentIndex !== null && cardarr[currentIndex]) {
                        cardarr[currentIndex].textContent = "▶";
                    let oldCard = cardarr[currentIndex].closest(".card");
                    oldCard.classList.remove("playing");
                   }
                playbtn.textContent = "▶";
            }

            // Play new song and Remember current song
            currentAudio.src =songs[i];
            currentsong=currentAudio;
            currentIndex = i;
            currentAudio.play();
            //update button
            cardarr[i].textContent = "⏸";
            playbtn.textContent = "⏸";
            //show current song name
            songname.textContent = decodeURIComponent(songs[i].split("/songs/")[1].replaceAll("%20", " "));
            let newCard = cardarr[i].closest(".card");
            newCard.classList.add("playing");
            
        });
    }
   
//Next button playing next song
   next.addEventListener("click", () => {
      if(currentSource==="cardsongs"){
    // If current song is the last song, do nothing
    if (currentIndex >= songs.length - 1) {
        return;
    }
    // Stop previous song
    currentAudio.pause();
    currentAudio.currentTime = 0;

    cardarr[currentIndex].textContent = "▶";
    playbtn.textContent = "▶";

     let oldCard = cardarr[currentIndex].closest(".card");
    oldCard.classList.remove("playing");
    // Move to next song
    currentIndex++;

    // Play next song
    currentAudio.src = songs[currentIndex];
    currentAudio.play();

    // Update buttons
    playbtn.textContent = "⏸";
    cardarr[currentIndex].textContent = "⏸";
    
    let newCard = cardarr[currentIndex].closest(".card");
     newCard.classList.add("playing");

    // Update song name
    songname.textContent =
        decodeURIComponent(
            songs[currentIndex].split("/songs/")[1]
        );
    }
 else if (currentSource === "library") {

    // If current song is the last song, do nothing
    if (currentliIndex >= librarysongarr.length - 1) {
        return;
    }

    // Stop previous song
    librayAudio.pause();
    librayAudio.currentTime = 0;

    // Reset previous library button
    if (currentLibraryButton !== null) {
        currentLibraryButton.src = "images/play.svg";
    }

    playbtn.textContent = "▶";

    // Move to next song
    currentliIndex++;

    // Get next song
    let nextSong = librarysongarr[currentliIndex];

    // Find the <li> of the next song
    let nextLi = songlist.querySelector(
        `li[data-song="${nextSong}"]`
    );

    // Get its play button
    currentLibraryButton = nextLi.querySelector(".play-library");

    // Play next song
    librayAudio.src = nextSong;
    librayAudio.play();

    // Update buttons
    playbtn.textContent = "⏸";
    currentLibraryButton.src = "images/pause.svg";

    // Update song name
    songname.textContent =
        decodeURIComponent(
            nextSong.split("/songs/")[1]
        );
}
});

////Previous button playing previous song
    document.querySelector(".pre").addEventListener("click", () => {
        if(currentSource==="cardsongs"){
        // If this is the first song, do nothing
        if (currentIndex<=0) {
        return;
        }

        //stop previuos song and update button
        currentAudio.pause();
        currentAudio.currentTime = 0;
        cardarr[currentIndex].textContent = "▶";
         let oldCard = cardarr[currentIndex].closest(".card");
         oldCard.classList.remove("playing");
        playbtn.textContent = "▶";
        console.log(currentAudio)

        //play next and update button
        currentIndex--;
         currentAudio.src = songs[currentIndex];
        currentAudio.play();
        playbtn.textContent = "⏸";
        cardarr[currentIndex].textContent = "⏸";
        let newCard = cardarr[currentIndex].closest(".card");
        newCard.classList.add("playing");

        // Update song name
        songname.textContent =
            decodeURIComponent(
                songs[currentIndex].split("/songs/")[1]
            );
        }

        //Previous button playing previous song of library
       else if (currentSource === "library") {
    // If current song is the last song, do nothing
    if (currentliIndex <=0) {
        return;
    }
    // Stop previous song
    librayAudio.pause();
    librayAudio.currentTime = 0;
    // Reset previous library button
    if (currentLibraryButton !== null) {
        currentLibraryButton.src = "images/play.svg";
    }
    playbtn.textContent = "▶";
    // Move to pre song
    currentliIndex--;
    // Get next song
    let preSong = librarysongarr[currentliIndex];
    // Find the <li> of the pre song
    let preLi = songlist.querySelector(
        `li[data-song="${preSong}"]`
    );
    // Get its play button
    currentLibraryButton = preLi.querySelector(".play-library");
    // Play next song
    librayAudio.src = preSong;
    librayAudio.play();
    // Update buttons
    playbtn.textContent = "⏸";
    currentLibraryButton.src = "images/pause.svg";
    // Update song name
    songname.textContent =
        decodeURIComponent(
            preSong.split("/songs/")[1]
        );
}
})

    //time format
    function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "00/00";
    }
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}

//time format of card song
           currentAudio.addEventListener("timeupdate", () => {
            if(currentSource!=="cardsongs"){
                return;
            }
        songtime.textContent = `${formatTime(currentAudio.currentTime)} / ${formatTime(currentAudio.duration)}`
        currentAudio.addEventListener("ended", () => {

    console.log("Song is complete");

    playbtn.textContent = "▶";

    if (currentIndex !== null) {
        cardarr[currentIndex].textContent = "▶";
    }
    })
           })

//time format of library song
 librayAudio.addEventListener("timeupdate", () => {
            if(currentSource!=="library"){
                return;
            }
        songtime.textContent = `${formatTime(librayAudio.currentTime)} / ${formatTime(librayAudio.duration)}`
})

//change buttton when song end
librayAudio.addEventListener("ended", () => {

    if (currentSource !== "library") {
        return;
    }

    console.log("Song is complete");

    playbtn.textContent = "▶";

    if (currentliIndex !== null && currentLibraryButton !== null) {
        currentLibraryButton.src = "images/play.svg";
    }
});

    let seekbar = document.querySelector(".seekbar");
    // Update seekbar while CARD song is playing
currentAudio.addEventListener("timeupdate", () => {
    if (currentSource === "cardsongs" && currentAudio.duration) {
        let percent =(currentAudio.currentTime / currentAudio.duration) * 100;

        seekbar.style.background = `
            linear-gradient(
                to right,
                #1ed760 ${percent}%,
                #555 ${percent}%
            )
        `;
    }
});

// Update seekbar while LIBRARY song is playing
librayAudio.addEventListener("timeupdate", () => {
    if (currentSource === "library" && librayAudio.duration) {
        let percent = (librayAudio.currentTime / librayAudio.duration) * 100;
        seekbar.style.background = `
            linear-gradient(
                to right,
                #1ed760 ${percent}%,
                #555 ${percent}%
            )
        `;
    }
});

//update song when clicking seekbar 
seekbar.addEventListener("click",e=>{
    let move=(e.offsetX/e.target.getBoundingClientRect().width)*100;
     if(currentSource=="cardsongs"){
    currentAudio.currentTime=(move*currentAudio.duration)/100;
    seekbar.style.background = `
        linear-gradient(
            to right,
            #1ed760 ${move}%,
            #555 ${move}%
        )
    `;
}
else if(currentSource=="library"){
    librayAudio.currentTime=(move*librayAudio.duration)/100;
    seekbar.style.background = `
        linear-gradient(
            to right,
            #1ed760 ${move}%,
            #555 ${move}%
        )
    `;
}
}
)
//making volume range working 
let volumebtn=document.querySelector(".volbtn");
document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change",e=>{
    if(currentSource=="cardsongs"){
       currentAudio.volume=parseInt(e.target.value)/100;
       if(parseInt(e.target.value)/100===0){
            volumebtn.src="images/mute.svg";
       }
       else{
       volumebtn.src="images/volume.svg";
       }
       console.log(e.target.value);
    }
    else if(currentSource=="library"){
       librayAudio.volume=parseInt(e.target.value)/100;
       if(parseInt(e.target.value)/100===0){
           volumebtn.src="images/mute.svg";
       }
       else{
        volumebtn.src="images/volume.svg";
       }
       console.log(e.target.value);
    }
})

//update volume and mute button
let volume=document.querySelector(".volume").getElementsByTagName("input")[0];
let prevolume=1;
volumebtn.addEventListener("click",e=>{
    if(currentSource==="cardsongs"){
    if(currentAudio.volume!==0){
         prevolume=currentAudio.volume;
        volumebtn.src="images/mute.svg";
        currentAudio.volume=0;
        volume.value=0;
    }
    else {
        currentAudio.volume=prevolume;
       volumebtn.src="images/volume.svg";
        volume.value=prevolume*100;
    }
    }

    else  if(currentSource==="library"){
    if(librayAudio.volume!==0){
         prevolume=librayAudio.volume;
        volumebtn.src="images/mute.svg";
        librayAudio.volume=0;
        volume.value=0;
    }
    else {
        librayAudio.volume=prevolume;
        volumebtn.src="images/volume.svg";
        volume.value=prevolume*100;
    }
    }
})

let songlist = document.querySelector(".songList").getElementsByTagName("ul")[0];
let adds = document.querySelectorAll(".add");
let librarysongarr =JSON.parse(localStorage.getItem("librarySongs")) || [];
 //display songs of library function
 function displaysongs(){
     songlist.innerHTML = "";
        librarysongarr.forEach((song) => {
        let songName = decodeURIComponent(
            song.split("/songs/")[1]
        );
        
        songlist.innerHTML += `
             <li data-song="${song}">
                <img class="invert" width="34" src="images/music.svg" alt="">

                <div class="info">
                    <div>
                        ${songName}
                    </div>
                </div>

                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert play-library" src="images/play.svg" alt="">
                    <img class="remove" src="images/remove.svg" alt="">
                       <p class="removehover">Remove from library</p>
                </div>
            </li>
        `;
 })
 }

// Add songs to library and local storage of JS
adds.forEach((add, i) => {
    add.addEventListener("click", () => {
       let song=songs[i];
       //dont add same song
       if(librarysongarr.includes(song)){
        return;
       }
       librarysongarr.push(song);
        // Save array to localStorage
        localStorage.setItem(
            "librarySongs",
            JSON.stringify(librarysongarr)
        );

        // Display library
        displaysongs();
    });
});
displaysongs();

//Remove from library
songlist.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      let li = e.target.closest("li");
        let song = li.dataset.song
        // Remove from array
        librarysongarr = librarysongarr.filter(
            item => item !== song
        );
          // Save updated array to localStorage
         localStorage.setItem(
            "librarySongs",
            JSON.stringify(librarysongarr)
        );
        // Remove from library
        li.remove();
        console.log(librarysongarr);
    }

});

//Play song from library
songlist.addEventListener("click", (e) => {
    if (!e.target.classList.contains("play-library")) {
        return;
    }
     
       // Stop previous normal card song
                currentAudio.pause();
                currentAudio.currentTime = 0;
                    if (currentIndex !== null && cardarr[currentIndex]) {
                          cardarr[currentIndex].textContent = "▶";
                        }
currentSource="library";

    let li = e.target.closest("li");
    let libraryPlayBtn = li.querySelector(".play-library");
    let song = li.dataset.song;
 let index = librarysongarr.indexOf(song);
    if (index === -1) {
        return;
    }
// Same song clicked again
    if (currentliIndex === index) {
        if (librayAudio.paused) {
            librayAudio.play();
            libraryPlayBtn.src = "images/pause.svg";
            playbtn.textContent = "⏸";

        } else {
            librayAudio.pause();
            libraryPlayBtn.src = "images/play.svg";
            playbtn.textContent = "▶";
        }
        return;
    }

    // Reset previous library button
    if (currentLibraryButton !== null) {
        currentLibraryButton.src = "images/play.svg";
    }

    // Start new song
    currentLibraryButton = libraryPlayBtn;
    currentliIndex = index;
    librayAudio.src = song;
    librayAudio.play();

    //updatebutton
    libraryPlayBtn.src = "images/pause.svg";
    playbtn.textContent = "⏸";
    songname.textContent = decodeURIComponent(song.split("/songs/")[1]);
});


console.log(currentsong);
 playbtn.addEventListener("click",()=>{
                  // No song selected yet
                if (currentSource===null) {
                        return;
                }
                if(currentSource==="cardsongs"){
                if (currentAudio.paused) {
                    currentAudio.play();
                    cardarr[currentIndex].textContent = "⏸";
                    playbtn.textContent = "⏸";
                } else {
                    currentAudio.pause();
                    cardarr[currentIndex].textContent = "▶";
                    playbtn.textContent = "▶";
                }
            }
            else if(currentSource==="library"){
                if (librayAudio.paused) {
                    librayAudio.play();
                    if (currentLibraryButton !== null) {
                currentLibraryButton.src = "images/pause.svg";
            }
                    playbtn.textContent = "⏸";
                } else {
                    librayAudio.pause();
                      if (currentLibraryButton !== null) {
                currentLibraryButton.src = "images/play.svg";
            }
                    playbtn.textContent = "▶";
                }
            }
    }
    )
    //Add event listener to humburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
       document.querySelector(".left").style.left="0";
    })

    //Add event listener to close
    document.querySelector(".close").addEventListener("click",()=>{
       document.querySelector(".left").style.left="-100%";
    })
    // Array.from(document.querySelector("songList").getElementsByTagName("<li>")[0]).array.forEach(e => {
          
    //        }
    //        )
    };
    main();
    //   //to get duration of audio
    //     audio.addEventListener("loadeddata", () => {
    //         let duration = audio.duration;
    //         console.log(duration, audio.currentSrc, audio.currentTime);
    //     }
    //     )
    //     let songlist = document.querySelector(".songList").getElementsByTagName("ul")[0];
    //     for (const song of songs) {
    //         songlist.innerHTML = songlist.innerHTML + `<li><img class="invert" width="34" src="images/music.svg" alt="">
    //                         <div class="info">
    //                             <div> 
    //                             ${song.replaceAll("%20", " ")}
    //                             </div>

    //                         </div>
    //                         <div class="playnow">
    //                             <span>Play Now</span>
    //                             <img class="invert" src="images/play.svg" alt="">
    //                         </div> </li>`;
    //     }
    //     //    Array.from(document.querySelector("songList").getElementsByTagName("<li>"))[0].array.forEach(e => {
    //     //     playsong(e.querySelector(".info").firstElementChild.innerHTML)
    //     //    });

    //     //    let btn=document.getElementById("pbtn");
    //     //    btn.addEventListener("click",()=>{
    //     //      let audio = new Audio(songs[0]);
    //     //      audio.play();
    //     //    }
    //     //    )