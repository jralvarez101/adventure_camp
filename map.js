class Map{

  constructor(){
    this.mapLocation = document.getElementById("map");
    this.map = map;

  }


  

  initMap() {
    
      // latitude and longitude of my location
    var myLatlng = new google.maps.LatLng(47.7511,-120.7401);


    // Map Options
    var mapOptions = {
       zoom: 10,
      center: myLatlng
    }

    // Creating a new map
    var map = new google.maps.Map(`${this.mapLocation}`, mapOptions);

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
 }
}