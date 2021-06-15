class UI{
    
    constructor(){
        this.campground = document.getElementById('campground');
        this.myModal = document.getElementById("myModal")
       

    }
    // Display campsite UI
    showCampsite(campsite){
        console.log(campsite)

        let output = '';

        campsite?.forEach(campsiteData => {
        
           output+=
            `
            <div class="main-card mt-3">
                <img src="${campsiteData.images[0].url}" alt="${campsiteData.images[0].altText}" class="card-img-top">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${campsiteData.name}</h5>
                    <p class="card-text">${campsiteData.description}</p>
                    <button  id="modalButton" type="button" class="btn btn-outline-success btn-sm w-50 " >
                    Read More
                    </button>
                </div>
            </div>
            `
        });

        this.campground.innerHTML = output;
            
    }

     //------------------------------- Modal functionality -------------------------------

    // Display Modal
    showModal(campsite){  

         let modalOutput = '';
         
         campsite?.forEach(campsiteData => {

            modalOutput+= 
            `
            <div id="simpleModal" class="custom-modal">
                <div class="custom-modal-content">
                    <span class="closeBtn">&times;</span>
                    <p>This is the modal for ${campsiteData.name}</p>
                </div>
            </div>`
            
            
         });
         

         console.log(this.myModal.innerHTML = modalOutput);

         // get modal
         const modal = document.getElementById('simpleModal');
         // get modal button
         const modalBtn = document.getElementById("modalButton");
         // get close button
         const closeBtn = document.getElementsByClassName("closeBtn")[0];
         // click event to launch modal
         modalBtn.addEventListener('click', openModal);
         // function to open modal
         function openModal(){  
             modal.style.display ='block';
        } 
        closeBtn.addEventListener('click', closeModal);
        // function to close modal
        function closeModal(){
            modal.style.display = 'none';
        }

    }
}
