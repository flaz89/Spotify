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

async function fetchArtist() {
  try {
    let searchArtist = new URLSearchParams(window.location.search);
    const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
    let id = searchArtist.get("artistid");
    const response = await fetch(url + id);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched", data);

    let containerTop = document.getElementById("back_image");
    containerTop.style.backgroundImage = `url("${data.picture_xl}")`;

    let headerArtist = document.getElementById("nomeArtista");
    headerArtist.innerHTML = `<div class="d-flex flex-column ms-4 pb-4">
<p class="m-0 text-white ms-2"><i class="bi bi-check-circle me-2 bg-primary"></i>Artista verificato</p>
<h1 class="m-0 text-white artist ms-2">${data.name}</h1>
</div>
<p class="text-white ms-4 pb-4">${(data.nb_fan * 100).toLocaleString(
      undefined,
      { maximumFractionDigits: 0 }
    )}  ascoltatori mensili.</p>`;

    let popularList = document.getElementById("listaArtist");
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}
fetchArtist();

async function fetchTracks() {
  try {
    let searchArtist = new URLSearchParams(window.location.search);
    let id = searchArtist.get("artistid");
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data2 = await response.json();
    console.log("Data fetched", data2);

    let array = data2.data;
    let popularList = document.getElementById("listaArtist");
    let playSong = document.getElementById("test");
    playSong.addEventListener("click", () => {
      let progress = document.getElementById("progress");
      progress.classList.toggle("barra");
    });
    for (let i = 0; i < array.length; i++) {
      popularList.innerHTML += ` 
  <li id='btnCard' class="text-white mt-4 ms-2 d-flex">
  <div class="row w-100 d-flex">
    <div class='col d-flex align-items-center'>
          <img src=${array[i].album.cover} alt=""
          class="img_album_artist" style="width: 100px;">
          <h5 class="ms-2">${array[i].title_short}</h5>
          </div>
      </div>
      <div class='col  d-flex align-items-center'>
      <p class="opacity-75 mx-5">${array[i].rank}</p>
      </div>
      <div class='col  d-flex align-items-center justify-content-between'>
      <p class="opacity-75 pe-4 ms-5">${Math.trunc(array[i].duration / 60)}:${(
        (array[i].duration / 60) *
        10
      ).toFixed(0)}</p>
      </div>
  </div>
</li>`;
      const playTop = document.getElementById("btnTop");
      playTop.addEventListener("click", (event) => {
        event.preventDefault();
        let audio = document.getElementById("audio");
        audio.src = `${array[i].preview}`;
        return audio.paused ? audio.play() : audio.pause();
      });
      const bottone = document.querySelectorAll("#btnCard");
      for (let i = 0; i < bottone.length; i++) {
        bottone[i].addEventListener("click", (event) => {
          event.preventDefault();
          let cardPlayer = document.getElementById("cardPlayer");
          cardPlayer.innerHTML = `  <div><!--img-->
      <img id="cover" src=${array[i].album["cover"]} alt="">
    </div>
    <div class="ms-2 d-flex align-items-center"> <!--description-->
      <div>
          <p class="text-white m-0">${array[i].title}</p>
          <p class="text-white">${array[i].artist["name"]}</p>
      </div>
      <div>
          <i class="bi bi-heart text-white ps-4"></i>
      </div>
    </div>`;
          let audio = document.getElementById("audio");
          audio.src = `${array[i].preview}`;
        });
      }
    }
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}
fetchTracks();

let audio = document.getElementById("audio");

function play() {
  return audio.paused ? audio.play() : audio.pause();
}

function play3(event) {
  event.preventDefault();
  return audio.paused ? audio.play() : audio.pause();
}

let shuffle = document.getElementById('shuffle')
shuffle.addEventListener('click', (event) => {
  event.preventDefault()
  shuffle.classList.toggle('iconColor')
})

let repeat = document.getElementById('repeat')
repeat.addEventListener('click', (event) => {
  event.preventDefault()
  repeat.classList.toggle('iconColor')
})