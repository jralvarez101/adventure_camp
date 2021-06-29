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

const onloadSearch =  async () => {


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


    return stateSearch;

};

// ----------------- display when search is made --------------------------------

document.getElementById('searchButton').addEventListener('click', async (event)=>{
   
    // Search Input
    event.preventDefault()

     currentPage = 1;
     stateSearch = '';

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

    if (currentCampsiteList === undefined){
        onloadSearch();
    } else {
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
    
             console.log(currentCampsiteList);         
            for (let i = 0; i < currentCampsiteList.length; i++){
                // Get variables
                const latitude = currentCampsiteList[i].latitude;
                const longitude = currentCampsiteList[i].longitude;
                const image = currentCampsiteList[i].images[0].url;
                const name = currentCampsiteList[i].name;
                const campsiteId = currentCampsiteList[i].id;
    
                // console.log(campsiteId); ------------important!
                
                
                // insertCoords(coords);
                const latLng = new google.maps.LatLng(latitude, longitude);
    
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    id: campsiteId,
                    
    
                  });  
                //   console.log(marker.id);   ------------important!
    
                 
    
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
    
                // marker.addListener('click', function(){
                //     ui.openModal
                // })
                
               
    
    
                 
            }  
    
        }
    }
  
  console.log(currentCampsiteList);
  
    
   

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

// -------------------- Reservation Modal ----------------------------------

$('#reserveButton').click(function(){
    $('#reserveModal').modal('show');

});

// -------- Modal Submission ---------------
// get variables

const numCampers = document.getElementById('numCampers');
const reservationDate = document.getElementById('date');
const campsiteName = document.getElementById('campsiteName');
var reserveModal = document.getElementById('reserveModal');


document.getElementById('reserveForm').addEventListener('submit', function(e){
    console.log('click event for submission works')
    alert(`Your reservation for ${numCampers.value} campers on ${reservationDate.value}
    for the ${campsiteName.value} campsite has been submitted`);
    

    e.preventDefault();
});






//---------- Modal validation  -------------

document.getElementById('campsiteName').addEventListener('blur', validateCampsite);
document.getElementById('date').addEventListener('blur', validateDate);

// ---- campsite name validation --------
function validateCampsite(){
    // first get value of name field
    
    const campsiteName = document.getElementById('campsiteName');
    const re = /^[A-Za-z_ ]{2,}$/;

    // use test method
    if(!re.test(campsiteName.value)){
        campsiteName.classList.add('is-invalid');
    } else {
        campsiteName.classList.remove('is-invalid');
    }
}

// ----- date validation---------

function validateDate(){
    const dateSelected = document.getElementById('date');
    const dateSelectedValue = dateSelected.value;
    const currentDate = new Date();
    
    // convert to milliseconds
    let dateSelectedConverted = Date.parse(dateSelectedValue);
    let currentDateConverted = currentDate.getTime();
 

    if(dateSelectedConverted <= currentDateConverted){
        dateSelected.classList.add('is-invalid');
    } else {
        dateSelected.classList.remove('is-invalid');
    }

}

// ------------ search bar validation -----------
//  document.getElementById('searchStateForm').addEventListener('submit', (e) => {
//      e.preventDefault();
//     console.log('submit form has been triggered');
//  })




// function validateSearchForm(){
//     console.log('submit form has been triggered');

    // const searchState = document.getElementById('searchCampsite');
    // const re = /^[A-Za-z]{2}$/;

    // if(!re.test(searchState.value)){
    //     campsiteName.classList.add('is-invalid');
    // } else {
    //     campsiteName.classList.remove('is-invalid');
    // }

    // e.preventDefault();
// }

    










