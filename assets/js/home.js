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

//funzione per far faunzionare il "player" -------------------------------------- PLAYER
function play() {
  var audio = document.getElementById("audio");
  audio.play();
}

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
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);

      riga.innerHTML = riga.innerHTML += ` <div class="col-2"> 
    <a href="">
    <div class="spotify-playlists">
        <div class="list">
            <div class="item">
                <img src=${array[i].album["cover"]} alt="Album Image">
                <div class="play">
                   <a href=""><img src="./assets/svg/player_card.svg"  class="btn_play " alt=""></a>
                </div>
                <h4>${array[i].album["title"]}</h4>
                <a href=""> <p>${array[i].artist["name"]}</p> </a>
            </div>
        </div>
    </div>
</a>
</div>`;
    }

    const riga2 = document.getElementById("buonasera");
    riga2.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${array[5].album["cover"]} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${array[i].album["title"]}</h5>
      </div>
    </div>
  </div>
  </div>
  </div>`;
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}
fetchData();
