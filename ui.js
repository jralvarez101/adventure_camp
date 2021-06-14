class UI{
    
    constructor(){
        this.campground = document.getElementById('campground');

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
                    <a href="" class="btn btn-outline-success btn-sm align-self-start">Read More</a> 
                </div>
            </div>
            `
        });

        this.campground.innerHTML = output;
    }
}
