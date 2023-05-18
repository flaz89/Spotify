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
 let rigaTop = document.getElementById('playing-container')
 rigaTop.innerHTML = ` <div id="playing-container-under-album" class="mx-4 w-100 d-flex">
 <img id="album-image" src=${data.cover} height="80%" alt="">
 <div id="text-container" class="ps-4 py-4 w-100">
     <p class="text-white m-0 mb-2 fw-bolder">ALBUM</p>
     <h1 class="m-0 mb-3 text-white">${data.title}</h1>
     <div class="d-flex align-items-center">
         <img class="rounded-circle me-2"
             src=${data.artist['picture']}
             width="21" style="aspect-ratio:1;" alt="">
             <h6 class="text-white m-0 fw-bolder">${data.artist['name']} • ${data.release_date} • ${data.nb_tracks}, <span>${Math.trunc(data.duration / 60)} min e ${Math.ceil((data.duration / 60) - Math.floor(data.duration / 60))} sec.</span> </h6>
     </div>
 </div>
</div>`
     /* const trackS = data.tracks.data;
      console.log(trackS)
      for (let i = 0; i < trackS.length; i++) {
        console.log(trackS[i])
      }*/
    
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  }
  fetchAlbum();
  
  
  
