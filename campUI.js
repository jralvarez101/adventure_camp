class Campsites{

    // Incorporate api_key and parameters
    constructor(){
        this.api_key = 'd87iVbl5DwZVrcSb74DKsXkleobU1TjuFUu2B4wf';

    }

    // Make API 'GET' request for the campgrounds
    async getCampground(stateCode){
        const campgroundResponse = await fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=&stateCode=${stateCode}&q=camping&api_key=${this.api_key}`);

        const campground = await campgroundResponse.json();
        return campground;


    }

}