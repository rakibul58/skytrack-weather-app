export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchHistory: string[];
  darkMode: boolean;
}

export interface WeatherResponse {
  data: WeatherData;
  status: number;
}
