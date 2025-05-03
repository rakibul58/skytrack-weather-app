/**
 * Formats temperature to show as integer and correct unit
 */
export const formatTemperature = (
  temp: number,
  unit: "celsius" | "fahrenheit" = "celsius"
): string => {
  const tempValue = Math.round(temp);
  const symbol = unit === "celsius" ? "°C" : "°F";
  return `${tempValue}${symbol}`;
};

/**
 * Capitalize the first letter of each word
 */
export const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Format date and time
 */
export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

/**
 * Get appropriate weather icon based on the weather condition ID from OpenWeatherMap
 * This is a simplified version - you would typically use more detailed logic or images
 */
export const getWeatherIconClass = (iconCode: string): string => {
  // Map OpenWeatherMap icon codes to corresponding classes
  // You might want to use actual icons or SVGs in a real app
  const iconMap: Record<string, string> = {
    "01d": "sunny",
    "01n": "clear-night",
    "02d": "partly-cloudy-day",
    "02n": "partly-cloudy-night",
    "03d": "cloudy",
    "03n": "cloudy",
    "04d": "cloudy",
    "04n": "cloudy",
    "09d": "rainy",
    "09n": "rainy",
    "10d": "rain",
    "10n": "rain",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snow",
    "13n": "snow",
    "50d": "fog",
    "50n": "fog",
  };

  return iconMap[iconCode] || "cloudy";
};
