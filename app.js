// Init Camp
const campsites = new Campsites;

// Init UI
const ui = new UI;

//Init googleMaps
const googleMap = new Map;




//-------------------- Pagination Data -------------------------------------------------------


// Get current Campsite for pagination 
const campsitesPerPage = 10;
let currentPage = 1;
let stateSearch = '';




// ------------------ Get amount of pages to display ------------------------------------------

function paginationInformation(campsiteData){
    // Get right amount of pages to display
    const indexOfLastCampsite = currentPage * campsitesPerPage;
    const indexOfFirstCampsite = indexOfLastCampsite - campsitesPerPage;
    const currentCampsites =  campsiteData.data.slice(indexOfFirstCampsite, indexOfLastCampsite);

    return currentCampsites;

}


//------------------- Display Pagination ------------------------------------------------------

function paginationDisplay(totalCampsites, campsitesPerPage){

    // Pagination (create right amount of pages)
    const pageNumbers = [];
    
    for(let i = 1; i <=  Math.ceil(totalCampsites / campsitesPerPage); i++){
        pageNumbers.push(i);    
    }  

    // UI Display pagination
    let output = '';
    pageNumbers.map(number =>{
        output +=
        `
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a onclick="paginate(${number})" class="page-link" href="#">${number}</a></li>
                </ul>
            </nav>  
        `
    });

    document.getElementById('pagination-display').innerHTML = output;  
        
        // it has to return currentPage so that it changes it on the outside
}

//---------------------- Change Page Functionality ----------------------------------------------

 async function paginate(number){
    
 
    currentPage = number;
    //Put Value of Search Text on getCampground and show data
    const campsiteData =  await campsites.getCampground(stateSearch)
    console.log('campsite data: ', campsiteData.data);

    const currentCampsites = paginationInformation(campsiteData);

    // Total amount of campsites
    const totalCampsites = campsiteData.data.length;

    // Show only current campsites on the page
    ui.showCampsite(currentCampsites);

    // Place pins for current campsites on page (for map)
    initMap(currentCampsites, stateSearch);

    // display pagination
    paginationDisplay(totalCampsites, campsitesPerPage);

    
    return currentPage;
}




// --------------------- Event Listener Cards and pagination display ------------------------------

// On Load --------------------
window.addEventListener('DOMContentLoaded', async () => {
    console.log('content has been loaded')

    currentPage = 1;
    stateSearch = 'wa';

    //Put Value of Search Text on getCampground and show data
    const campsiteData =  await campsites.getCampground(stateSearch)
    console.log('campsite data: ', campsiteData.data);

    const currentCampsites = paginationInformation(campsiteData);

    // Total amount of campsites
    const totalCampsites = campsiteData.data.length;

    // Show only current campsites on the page
    ui.showCampsite(currentCampsites);

    // Place pins for current campsites on page (for map)
    initMap(currentCampsites, stateSearch);

    // display pagination
    paginationDisplay(totalCampsites, campsitesPerPage);

    console.log(stateSearch);

    return stateSearch;

});

document.getElementById('searchButton').addEventListener('click', async (event)=>{
   
    // Search Input
    event.preventDefault()

     currentPage = 1;
     stateSearch = 'wa';

    stateSearch = document.getElementById('searchCampsite').value.toUpperCase();
    
    //Put Value of Search Text on getCampground and show data
    const campsiteData =  await campsites.getCampground(stateSearch)
    console.log('campsite data: ', campsiteData.data);
    

    const currentCampsites = paginationInformation(campsiteData);

    // Total amount of campsites
    const totalCampsites = campsiteData.data.length;

    // Show only current campsites on the page
    ui.showCampsite(currentCampsites);


    // Place pins for current campsites on page (for map)
    initMap(currentCampsites, stateSearch);

    // display pagination
    paginationDisplay(totalCampsites, campsitesPerPage);

    console.log(stateSearch);

    return stateSearch;


});


// ------------- map functionality for now ----------------------------------------------------



// First load states and their coordinates


async function loadStates(){
    const response = await fetch("./states.json")
    const stateCoords = await response.json();
    return stateCoords

}


let map;

// On first Load

async function initMap(currentCampsiteList,stateSearch){
    console.log(currentCampsiteList);
  
    const coordinates = {latitude:47.7511, longitude: -120.7401 }
    // ---- Loading First Map Window based on search --------------
   const stateCoordinates = await loadStates()

   const selectedStateCoordinates = stateCoordinates.find(x => x.state === stateSearch)

   if(selectedStateCoordinates){
       coordinates.latitude = selectedStateCoordinates.latitude
       coordinates.longitude = selectedStateCoordinates.longitude
   }

    // Washington State Map
    const {longitude, latitude} = coordinates

    var myLatlng = new google.maps.LatLng(latitude,longitude);

    // Map Options
    var mapOptions = {
        zoom: 6,
        center: myLatlng,
        mapTypeId: "terrain"
        }
     
    // Creating a new map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // ---- Adding Markers to Map based on pagination -----

    addMarker();
    
     function addMarker () {           
        for (let i = 0; i < currentCampsiteList.length; i++){
            // Get variables
            const latitude = currentCampsiteList[i].latitude;
            const longitude = currentCampsiteList[i].longitude;
            const image = currentCampsiteList[i].images[0].url;
            const name = currentCampsiteList[i].name;
            const campsiteId = currentCampsiteList[i].id;

            console.log(campsiteId);
            
            
            // insertCoords(coords);
            const latLng = new google.maps.LatLng(latitude, longitude);

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
              });  

              var contentString = `
              <div class="d-flex pinInfo ">
              <img class="pinImg" src="${image}">
              <p class="pinText">${name}</p>
              </div>`

              marker.infoWindow = infoWindow

            var infoWindow = new google.maps.InfoWindow({
                content: contentString
                
            })
            // Open infoWindow

            marker.addListener('mouseover', function(){
                return this.infoWindow.open(map, this);
            })

            // Close infoWindow
            marker.addListener('mouseout', function(){
                return this.infoWindow.close(map, this);
            })

            // Open modal on click

            
           


             
        }  

    }
    
   

}


// fixed map positioning

var fixmeTop = $('.fixed-map').offset().top;
$(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll >= fixmeTop) {
        $('.fixed-map').css({
            position: 'fixed',
            top: '0',
            right: '0'
        });
    } else {
        $('.fixed-map').css({
            position: 'static'
        });
    }
});

// Reservation Modal

$('#reserveButton').click(function(){
    $('#reserveModal').modal('show');

});

// Modal validation

document.getElementById('campsiteName').addEventListener('blur',validateCampsite);

function validateCampsite(){
    // first get value of name field
    console.log('this works')
    const campsiteName = document.getElementById('campsiteName');
    const re = /^[A-Za-z\s]{2,}+$/;

    // use test method
    if(!re.test(campsiteName.value)){
        campsiteName.classList.add('is-invalid');
    } else {
        campsiteName.classList.remove('is-invalid');
    }
}










