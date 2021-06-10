// Init Camp
const campsites = new Campsites;



// Init UI
const ui = new UI;



// On submit event listener to Search button
document.getElementById('searchButton').addEventListener('click', async (event)=>{
    console.log('search listener called')
    // Search Input
    event.preventDefault()
    const stateSearch = document.getElementById('searchCampsite').value;
    
    
    //Put Value of Search Text on getCampground and show data
   
    const campsiteData =  await campsites.getCampground(stateSearch)
    

    // console.log('campsite data: ', campsiteData);
    
    ui.showCampsite(campsiteData);
    // campsiteData.then(data => {
    //     console.log('this works');
       
    // });


})










// map info down below for now


let map;

function initMap() {

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



// Creating a map marker
// var marker = new google.maps.Marker({
//     position: myLatlng,
//     title:"Home Campsite",
//     body:"this is the spot to kick it",
//     icon: "http://maps.google.com/mapfiles/kml/shapes/campground.png"
// });

//  var infoWindow = new google.maps.InfoWindow({
//      content:'<h1>Home</h1>'
//  })

//   marker.addListener('click', ()=>{
//     infoWindow.open(map, marker); 
//  })

// To add the marker to the map, call setMap();
// marker.setMap(map);
  

}

// magic scroll

// function splitScroll(){

//     const controller = new ScrollMagic.Controller();

    
//     var scene = new ScrollMagic.Scene({
//         duration:"100%",
//         triggerElement: ".display-section",
//         triggerHook:0

        
//     })
//     .setPin("#map")
//     .addIndicators()
//     .addTo(controller)
// }

// splitScroll();
