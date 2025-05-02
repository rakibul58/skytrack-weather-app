import { setLoading, setWeatherData, setError } from "./weatherSlice";
import { AppDispatch } from "./store";

const API_KEY = import.meta.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = (city: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }

    const data = await response.json();
    dispatch(setWeatherData(data));
  } catch (error) {
    dispatch(
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      )
    );
  }
};
