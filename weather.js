class Weather {
  constructor(latitude, longitude) {
    this.apiKey = "a6577855dd6a250c261fa8a3e260e807";
    this.longitude = longitude;
    this.latitude = latitude;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=imperial`
    );
    const responseData = await response.json();
    return responseData;
  }
}
