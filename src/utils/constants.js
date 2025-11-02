export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/Day/Sunny.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/Night/Sunny.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/Day/Cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/Night/Cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../assets/Day/Rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/Night/Rain.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "storm",
    url: new URL("../assets/Day/Storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/Night/Storm.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "snow",
    url: new URL("../assets/Day/Snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/Night/Snow.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "fog",
    url: new URL("../assets/Day/Fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/Night/Fog.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/Day/Default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/Night/Default.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 36.193884,
  longitude: -115.25865,
};

export const APIkey = "f984c3f6ca43f289c47ed51eb49e6d6e";
