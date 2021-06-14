// Init Camp
const campsites = new Campsites;

// Init UI
const ui = new UI;




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

    // display pagination
    paginationDisplay(totalCampsites, campsitesPerPage);

    
    return currentPage;
}




// --------------------- Event Listener Cards and pagination display ------------------------------

document.getElementById('searchButton').addEventListener('click', async (event)=>{
   
    // Search Input
    event.preventDefault()

    stateSearch = document.getElementById('searchCampsite').value;

    
    //Put Value of Search Text on getCampground and show data
    const campsiteData =  await campsites.getCampground(stateSearch)
    console.log('campsite data: ', campsiteData.data);

    const currentCampsites = paginationInformation(campsiteData);

    // Total amount of campsites
    const totalCampsites = campsiteData.data.length;

    // Show only current campsites on the page
    ui.showCampsite(currentCampsites);

    // display pagination
    paginationDisplay(totalCampsites, campsitesPerPage);

    return stateSearch;


});










// map info down below for now

let map;


function initMap(){

    // latitude and longitude of my location
    var myLatlng = new google.maps.LatLng(47.711611,-122.2925763);


    // Map Options
    var mapOptions = {
    zoom: 10,
    center: myLatlng
    }

    // Creating a new map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // call addMarker
    addMarker(myLatlng);
    addMarker({lat: 47.8107,lng: -122.3774});

    // Add marker function (to add several markers)
    function addMarker(coords){
            var marker = new google.maps.Marker({
            position: coords,
            title:"Home Campsite",
            map:map,
            body:"this is the spot to kick it",
            
        });
    }
};




// fixed map

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
