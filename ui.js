class UI{
    
    constructor(){
        this.campground = document.getElementById('campground');
        this.myModalContent = document.getElementById('myModalContent');
        this.campsiteList = []
        
  
        
       

    }
    // Display campsite UI
    showCampsite(campsiteList){

        let output = '';

        campsiteList?.forEach(campsiteData => {
        
           output+=
            `
            <div class="main-card mt-3">
                <img src="${campsiteData.images[0].url}" alt="${campsiteData.images[0].altText}" class="card-img-top">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${campsiteData.name}</h5>
                    <p class="card-text">${campsiteData.description}</p>
                    <button  id="${campsiteData.id}" type="button" class="btn btn-outline-success btn-sm w-50 " >
                    Read More
                    </button>
                </div>
            </div>
            `
        });

        this.campground.innerHTML = output;
        


        this.addModalEventListeners(campsiteList)
       
    }

     //------------------------------- Modal functionality -------------------------------

     //First we create the modal

   openModal=(event)=>{ 
    const modal = document.getElementById('simpleModal');
      
        // This indicates what id was clicked on
        console.log('clicked on id: ',event.target.id)
       const clickedOnCampsiteData =  this.campsiteList?.find(campsite => campsite.id === event.target.id)
       console.log('clicked on campsite data: ', clickedOnCampsiteData?.name)

       let modalOutput = 
       `
       <img src="${clickedOnCampsiteData?.images[0].url}" alt="${clickedOnCampsiteData?.images[0].altText}" class="modal-image-top">
       <h1 class="modal-heading"> ${clickedOnCampsiteData?.name}</h1>
       <p class="modal-description">${clickedOnCampsiteData?.description}</p>
       <hr>
       <div class="container-fluid d-flex center-modal-div">
            <div class="directions-div">
                <h3 class="directions-title">Directions</h3>
                <p class="directions">${clickedOnCampsiteData?.directionsOverview}</p>
                <a class="directions-anchor" href="${clickedOnCampsiteData?.directionsUrl}" target="blank">Get Directions</a>
                <hr>
                <h3 class="cost-heading">Fees:</h3>
                <ul id="costDisplay"></ul>
            </div>
            <div class="d-flex justify-content-center">
               
            </div>
       </div>
       
       
       `
      console.log(this.myModalContent.innerHTML = modalOutput );

      // Dynamically show fees

      let costDisplay = '';
      clickedOnCampsiteData?.fees.forEach(fees =>{
        costDisplay +=
        `
        <li class="list-item"> $${fees.cost} for ${fees.title}</li>
        `
      });

      document.getElementById('costDisplay').innerHTML = costDisplay;

        //This opens displays the modal
        modal.style.display ='block';
   } 

    addModalEventListeners (campsiteList){

        this.campsiteList = campsiteList
        console.log(campsiteList);

        const modal = document.getElementById('simpleModal');

        const closeBtn = document.getElementsByClassName("closeBtn")[0];

        // listen for outside
        window.addEventListener('click', clickOutside)


        // listen for close click
        closeBtn.addEventListener('click', closeModal);

        // function to close modal
        function closeModal(){
            modal.style.display = 'none';
        }

        // listen for outside
        function clickOutside(e){
            if(e.target == modal){
                modal.style.display = 'none';
            }
            
        }

        // function to open Modal


        campsiteList.forEach(campsite => {
            const modalBtn = document.getElementById(campsite.id);

            modalBtn.addEventListener('click',this.openModal);
            

        })
       
        
    }
  
}
