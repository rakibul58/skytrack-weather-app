interface WeatherIconProps {
  iconCode: string;
  description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, description }) => {
  const getWeatherEmoji = (iconCode: string): string => {
    const iconType = iconCode.substring(0, 2);
    switch (iconType) {
      case "01":
        return "☀️"; // clear sky
      case "02":
        return "⛅"; // few clouds
      case "03":
        return "☁️"; // scattered clouds
      case "04":
        return "☁️"; // broken or overcast clouds
      case "09":
        return "🌧️"; // shower rain
      case "10":
        return "🌦️"; // rain
      case "11":
        return "⛈️"; // thunderstorm
      case "13":
        return "❄️"; // snow
      case "50":
        return "🌫️"; // mist/fog
      default:
        return "🌡️";
    }
  };

  return (
    <div className="text-4xl" title={description}>
      {getWeatherEmoji(iconCode)}
    </div>
  );
};

export default WeatherIcon;
