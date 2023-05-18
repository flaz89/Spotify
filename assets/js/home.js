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

mainBody.addEventListener("scroll", function () {
  const top = mainBody.scrollTop;

  if (top >= 130) {
    upperBar.classList.add("active");
    upperBar.classList.remove("inactive");
  } else if (top < 130) {
    upperBar.classList.remove("active");
    upperBar.classList.add("inactive");
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
    for (let i = 0; i < array.length; i++) {
      console.log(array[i].album.id);

      riga.innerHTML += ` <div class="col-2"> 
    <a href="../../album.html?albumid=${array[i].album.id}">
    <div class="spotify-playlists">
        <div class="list">
            <div class="item">
                <img src=${array[i].album["cover"]} alt="Album Image">
                <div class="play">
                   <a onclick="play3(event)" id='player5' href=""><img src="./assets/svg/player_card.svg" class="btn_play " alt=""></a>
                </div>
                <h4>${array[i].album["title"]}</h4>
                <a href="../../artist.html?artistid=${array[i].artist.id}"> <p>${array[i].artist["name"]}</p> </a>
            </div>
        </div>
    </div>
</a>
</div>`;
    }
for(let i = 0; i < 6; i++){
  const riga2 = document.getElementById("buonasera");
    riga2.innerHTML += `<div class="col-6 col-md-4">
    <a href="../../album.html?albumid=${array[i].album.id}">
    <div class="card mb-3 mt-4 spotify-playlists2">
    <div class="row g-0">
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
</a>
</div>`;
}    
    let audio = document.getElementById("audio");
    audio.src = `${array[0].preview}`;
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}
fetchData();

//funzione per far faunzionare il "player" -------------------------------------- PLAYER
let audio = document.getElementById("audio");
function play() {
  return audio.paused ? audio.play() : audio.pause();
}

function play2() {
  return audio.paused ? audio.play() : audio.pause();
}

function play3(event) {
  event.preventDefault();
  return audio.paused ? audio.play() : audio.pause();
}

 /*async function playMusic (event) {
  const valore = await fetchData();
  console.log(valore);
  event.preventDefault();
  if (valore[i].album.id == valore[i].album.id) {
    let rigaPlayer = document.getElementById("rigaPlayer");
    rigaPlayer.innerHTML = ` <div id="player" class="col-12 p-0">
<div id="musicPlayer" class=" d-flex justify-content-between align-items-center pb-2">
<div class="d-flex"> <!--all cover-->
  <div><!--img-->
      <img id="cover" src=${valore[i].album["cover"]} alt="">
  </div>
  <div class="ms-2 d-flex align-items-center"> <!--description-->
      <div>
          <p class="text-white m-0">${valore[i].album["title"]}</p>
          <p class="text-white">${valore[i].artist["name"]}</p>
      </div>
      <div>
          <i class="bi bi-heart text-white ps-4"></i>
      </div>
  </div>
</div>`;
  }
};*/
