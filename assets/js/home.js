const mainBody = document.getElementById("main-body");
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const upperBar = document.getElementById("upper-bar");

//funzione per aprire e chiudere la "sidebar" di destra -------------------------------------- SIDEBAR
toggleSidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

closeSidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

//funzione per cambiare il colore della "upper-bar" in fase di scrolling -------------------------------------- UPPER-BAR

const red = Math.floor(Math.random() * 256);
const green = Math.floor(Math.random() * 256);
const blue = Math.floor(Math.random() * 256);

mainBody.addEventListener("scroll", function () {
  const top = mainBody.scrollTop;

  if (top >= 130) {
    upperBar.style.backgroundColor = `rgb(${red}, ${green}, ${blue}, .6)`;
  } else if (top < 130) {
    upperBar.style.backgroundColor = `transparent`;
  }
});

async function fetchData() {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched", data);
    const riga = document.getElementById("cioChetiPiace");
    const array = data["data"];

    //---------------------------------------------------------- RANDOM SONG HEADER
    const randomSong = Math.floor(Math.random() * 25) + 1;

    document.getElementById(
      "playing-container"
    ).innerHTML += `<div id="playing-container-under" class=" px-3 w-100 d-flex">
        <img id="imageColor" src="${array[randomSong].album.cover_big}" height="100%" class="py-4" alt="">
        <div id="text-container" class="ps-4 my-2 w-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <p class="text-white m-0 fw-bolder">ALBUM</p>
                <button id="btnAnnunci">NASCONDI ANNUNCI</button>
            </div>
           <div id="containerTextScroll" class="overflow-hidden d-flex"><div class="scrollingText"><h1 class="m-0 text-white scrollingText">${array[randomSong].title}</span></h1></div></div>
            <h6 class="mb-3 text-white">${array[randomSong].artist.name}</h6>
            <h6 class="text-white">Ascolta il nuovo singolo di ${array[randomSong].artist.name}!</h6>
            <div class="d-flex align-items-center gap-3 mt-1">
                <button type="button" onclick="play2('${array[randomSong].preview}')" id="btnPlay">Play</button>
                <button id="btnSave">Save</button>
                <a href="javascript:void(0)"><strong class="p-1 ms-2 fs-4">•••</strong></a>
            </div>
        </div>
    </div>`;
    let cardPlayer = document.getElementById("cardPlayer");
    cardPlayer.innerHTML = `  <div><!--img-->
    <img id="cover" src=${array[randomSong].album["cover"]} alt="">
</div>
<div class="ms-2 d-flex align-items-center"> <!--description-->
    <div>
        <p class="text-white m-0">${array[randomSong].album["title"]}</p>
        <p class="text-white">${array[randomSong].artist["name"]}</p>
    </div>
    <div>
        <i class="bi bi-heart text-white ps-4"></i>
    </div>
</div>`;

    for (let i = 0; i < array.length; i++) {
      console.log(array[i].album.id);

      riga.innerHTML += ` <div class="col-12 col-md-2"> 
    <a href="../../album.html?albumid=${array[i].album.id}">
    <div class="spotify-playlists">
        <div class="list">
            <div id="card_xl" class="item">
                <img src=${array[i].album["cover"]} alt="Album Image">
                <div id="flex_" class="d-md-none">
                <div>
                <i class="bi bi-heart-fill text-success"></i>
                <i class="bi bi-three-dots-vertical text-light"></i>
                </div>
                <i class="bi bi-play-circle text-light destra"></i>
                </div>
                <div class="play">
                   <a onclick="play3(event, '${array[i].preview}')" id='player5' href=""><img src="./assets/svg/player_card.svg" class="btn_play " alt=""></a>
                </div>
                <div class="text_cardXl">
                
                <h4>${array[i].album["title"]}</h4>
                <a href="../../artist.html?artistid=${array[i].artist.id}"> <p>${array[i].artist["name"]}</p> 
                </a>            
                </div>           
                </div>
        </div>
    </div>
</a>
</div>`;
    }

    for (let i = 0; i < 6; i++) {
      const riga2 = document.getElementById("buonasera");
      riga2.innerHTML += `<div class="col-6 col-md-4">
    <a href="../../album.html?albumid=${array[i].album.id}">
    <div class="card mb-3 mt-4 spotify-playlists2">
    <div class="row g-0">
    <div class="d-flex">
        <div class="col-md-4 ">
            <div class="d-flex w-50">
                <img src=${array[i].album["cover"]} class="img-fluid" alt="...">
                <img src=${array[i].artist["picture"]} class="img-fluid" alt="...">
            </div>
            <div class="d-flex w-50">
                <img src=${array[i].artist["picture"]} class="img-fluid " alt="...">
                <img src=${array[i].album["cover"]} class="img-fluid " alt="...">
            </div>
        </div>
        <div class="col-md-8 d-flex align-items-center">
            <div class="card-body ">
                <h2 class="card-title text_title">${array[i].album["title"]}</h2>
            </div>
        </div>
        </div>
    </div>
</div>
</a>
</div>`;
    }
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}
fetchData();

//funzione per far faunzionare il "player" -------------------------------------- PLAYER
let audio = document.getElementById("audio");
function play(src) {
  audio.src = src;
  return audio.paused ? audio.play() : audio.pause();
}

function play2(src) {
  audio.src = src;
  return audio.paused ? audio.play() : audio.pause();
}

function play3(event, src) {
  event.preventDefault();
  audio.src = src;
  return audio.paused ? audio.play() : audio.pause();
}
