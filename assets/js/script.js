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
    const riga = document.getElementById('riga')
    const array = data['data']
    console.log(array)
for (let i = 0; i < array.length; i++) {
  console.log(array[i])

  riga.innerHTML =  riga.innerHTML += `<div class="col-6 col-md-4 col-lg-3 mb-4 colonna"><div class="card h-100">
  <img src=${array[i].album['cover']} class="card-img-top" alt="...">
  <div class="card-body">
   <h5 class="card-title"></h5>
   <p class="card-text"></p>
   <p class="card-text"></p>
   <p class="card-text"></p>
   <div class="d-flex flex-column">
   <a class="btn btn-primary mb-1" href="indexBACK.html?id=">Modifica</a>
   <a id="btnInfo" class="btn btn-success mb-1" href="indexDETAILS.html?id=">info</a>
   </div>
</div>
</div></div>`

}

const riga2 = document.getElementById('riga2')
riga2.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
<div class="row g-0">
  <div class="col-md-4">
    <img src=${array[5].album['cover']} class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>`    
    
  } catch (error) {
    console.log("Fetch Error:", error);
  }
}
fetchData();

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}