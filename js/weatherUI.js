class WeatherUI {
  constructor() {
    this.desc = document.getElementById("w-desc");
    this.string = document.getElementById("w-string");
    this.icon = document.getElementById("w-icon");
  }

  paint(weather) {
    let weatherIcon = weather.weather[0].icon;
    let temperature = Math.floor(weather.main.temp);

    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = `${temperature} \xB0F`;
    this.icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    );
  }
}
