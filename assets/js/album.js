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
  