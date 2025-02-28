// ? =============> Global ===============>
const loader = document.querySelector(".loading")
// ! =============> When Start ===============>
    getGames('mmorpg')

// * =============> Events ===============>
    // active nav bar 
    document.querySelectorAll('.menu .nav-link').forEach(function(link){
        link.addEventListener('click' , function(){
            document.querySelector('.menu .active').classList.remove('active');
            link.classList.add('active');

            const category = link.getAttribute("data-category")
            getGames(category)
        })
    })

// ! =============> Functions ===============>
async function getGames(categoryName){
    loader.classList.remove("d-none")
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '60869025b5mshb2a9dc03a26b0f5p1226a5jsn0b579ad70df0',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
    const apiResponse = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}` ,options);
    const data = await apiResponse.json()
    loader.classList.add("d-none")
   
    displayData(data)
}





function displayData(data) {
    let gamesBox = ``;
    for (let i = 0; i < data.length; i++) {
       let videPath = data[i].thumbnail.slice(0, data[i].thumbnail.lastIndexOf("/")) + "/videoplayback.webm";
 
       gamesBox += `
       <div class="col">
       <div  onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" class="card h-100 bg-transparent" role="button" onclick="showDetails(${
          data[i].id
       })">
          <div class="card-body">
             <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
              <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
               <source src="${videPath}">
               </video>
             </figure>
 
             <figcaption>
 
                <div class="hstack justify-content-between">
                   <h3 class="h6 small">${data[i].title}</h3>
                   <span class="badge text-bg-primary p-2">Free</span>
                </div>
 
                <p class="card-text small text-center opacity-50">
                   ${data[i].short_description.split(" ", 8)}
                </p>
 
             </figcaption>
          </div>
 
          <footer class="card-footer small hstack justify-content-between">
 
             <span class="badge badge-color">${data[i].genre}</span>
             <span class="badge badge-color">${data[i].platform}</span>
 
          </footer>
       </div>
    </div>
       `;
    }
 
    document.getElementById("gameData").innerHTML = gamesBox;
 }
 function startVideo(event){
    const videoEl = event.target.querySelector("video")
    videoEl.classList.remove("d-none")
    videoEl.muted =true 
    videoEl.play()
    
 }
 function stopVideo(event){
    const videoEl = event.target.querySelector("video")
    videoEl.classList.add("d-none")
    videoEl.muted =true 
    videoEl.pause()
 }
function showDetails(id){
    location.href = `./details.html?id=${id}`
}