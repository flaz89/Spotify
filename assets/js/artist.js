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
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  }
  fetchArtist();
  