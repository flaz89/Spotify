const mainBody = document.getElementById("main-body-album");
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





const mainContent = document.getElementById("main-body-album");
const red = Math.floor(Math.random() * 256);
const green = Math.floor(Math.random() * 256);
const blue = Math.floor(Math.random() * 256);


//funzione per cambiare il colore della "upper-bar" in fase di scrolling -------------------------------------- UPPER-BAR

mainBody.addEventListener("scroll", function () {
  const top = mainBody.scrollTop;

  if (top >= 130) {
    upperBar.style.backgroundColor = `rgb(${red}, ${green}, ${blue}, .6)`;
  } else if (top < 130) {
    upperBar.style.backgroundColor = `transparent`;
  }
});







//funzione per far mandare in su il BG in fase di scrolling -------------------------------------- BG_ALBUM_SCROLL
function changeColor() {
  mainContent.style.backgroundImage = `linear-gradient(to bottom, rgb(${red}, ${green}, ${blue}) 100px, #101010 500px)`
}
changeColor();


//funzione per far mandare in su il BG in fase di scrolling -------------------------------------- BG_ALBUM_SCROLL

mainContent.addEventListener("scroll", function() {
  const position = mainContent.scrollTop;
  mainContent.style.backgroundPositionY =  - position + "px";
})






// -----------------------------------------------------
async function fetchAlbum() {
  try {
    let searchAlbum = new URLSearchParams(window.location.search);
    const url = "https://striveschool-api.herokuapp.com/api/deezer/album/";
    let id = searchAlbum.get("albumid");
    const response = await fetch(url + id);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched", data);
    let rigaTop = document.getElementById("playing-container");
    rigaTop.innerHTML = ` <div id="playing-container-under-album" class="mx-4 w-100 d-flex">
 <img id="album-image" src=${data.cover} height="80%" alt="">
 <div id="text-container" class="ps-4 py-4 w-100">
     <p class="text-white m-0 mb-2 fw-bolder">ALBUM</p>
     <h1 class="m-0 mb-3 text-white">${data.title}</h1>
     <div class="d-flex align-items-center">
         <img class="rounded-circle me-2"
             src=${data.artist["picture"]}
             width="21" style="aspect-ratio:1;" alt="">
             <h6 class="text-white m-0 fw-bolder">${data.artist["name"]} • ${
      data.release_date
    } • ${data.nb_tracks}, <span>${Math.trunc(
      data.duration / 60
    )} min e ${Math.ceil(
      data.duration / 60 - Math.floor(data.duration / 60)
    )} sec.</span> </h6>
     </div>
 </div>
</div>`;
    const trackS = data.tracks.data;
    console.log(trackS);
    let songAlbum = document.getElementById("body-container-under");

    for (let i = 0; i < trackS.length; i++) {
      songAlbum.innerHTML += `
        <div id="album-song" class="row d-flex align-items-center text-white px-4 py-2">
                            <div class="col d-flex align-items-center">
                                <div class="d-flex align-items-center me-3 fs-5"><p class="m-0">${
                                  i + 1
                                }</p></div>
                                <div>
                                    <a id='btnCard' href=""><h6 class="mb-1 text-white">${
                                      trackS[i].title
                                    }</h6></a>
                                    <a href=""><p id="artist-link" class="m-0">${
                                      trackS[i].artist["name"]
                                    }</p></a>
                                </div>
                            </div>
                            <div class="col text-end"><p class="m-0">${
                              trackS[i].rank
                            }</p></div>
                            <div class="col-3 text-end"><p class="m-0">${Math.trunc(
                              trackS[i].duration / 60
                            )}:${((trackS[i].duration / 60) * 10).toFixed(
        0
      )}</p> </div>
                        </div>
        `;
      const bottone = document.querySelectorAll("#btnCard");
      for (let i = 0; i < bottone.length; i++) {
        bottone[i].addEventListener("click", (event) => {
          event.preventDefault();
          let cardPlayer = document.getElementById("cardPlayer");
          cardPlayer.innerHTML = `  <div><!--img-->
      <img id="cover" src=${trackS[i].album["cover"]} alt="">
    </div>
    <div class="ms-2 d-flex align-items-center"> <!--description-->
      <div>
          <p class="text-white m-0">${trackS[i].title}</p>
          <p class="text-white">${trackS[i].artist["name"]}</p>
      </div>
      <div>
          <i class="bi bi-heart text-white ps-4"></i>
      </div>
    </div>`;
          let audio = document.getElementById("audio");
          audio.src = `${trackS[i].preview}`;
        });
      }
    }
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}
fetchAlbum();

let audio = document.getElementById("audio");
function play2() {
  return audio.paused ? audio.play() : audio.pause();
}

function play3(event) {
  event.preventDefault();
  return audio.paused ? audio.play() : audio.pause();
}

