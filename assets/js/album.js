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

async function fetchAlbum() {
    try {
      let searchAlbum = new URLSearchParams(window.location.search);
      const url = "https://striveschool-api.herokuapp.com/api/deezer/album/";
      let id = searchAlbum.get("albumid");
      console.log(id);
      const response = await fetch(url + id);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data fetched", data);
      const riga4 = document.getElementById("riga4");
      const array = data["data"];
      console.log(array);
    
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  }
  fetchAlbum();
  