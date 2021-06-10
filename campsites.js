class Campsites{

    // Incorporate api_key and parameters
    constructor(){
        this.api_key = 'd87iVbl5DwZVrcSb74DKsXkleobU1TjuFUu2B4wf';
        this.limit = 10;
        

    }

    // Make API 'GET' request for the campgrounds
    async getCampground(stateSearch){
        const campgroundResponse = await fetch(`https://developer.nps.gov/api/v1/campgrounds?parkCode=&stateCode=${stateSearch}&limit=${this.limit}&q=camping&api_key=${this.api_key}`);

        const campground = await campgroundResponse.json();
        
        return campground;

    }

}