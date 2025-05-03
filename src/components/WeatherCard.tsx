import React from 'react';
import { WeatherData } from '../types';
import { formatTemperature } from '../utils/helper';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const weatherCondition = weather[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md transition-colors">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{name}, {sys.country}</h2>
          <p className="text-gray-600 dark:text-gray-300 capitalize">{weatherCondition.description}</p>
        </div>
        <WeatherIcon iconCode={weatherCondition.icon} description={weatherCondition.description} />
      </div>

      <div className="mb-6">
        <div className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
          {formatTemperature(main.temp)}
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Feels like {formatTemperature(main.feels_like)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Humidity</p>
          <p className="font-semibold text-gray-800 dark:text-white">{main.humidity}%</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Wind Speed</p>
          <p className="font-semibold text-gray-800 dark:text-white">{wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;