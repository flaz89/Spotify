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