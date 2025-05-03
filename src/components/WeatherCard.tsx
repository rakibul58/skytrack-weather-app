import React from "react";
import { WeatherData } from "../types";
import { formatTemperature } from "../utils/helper";
import WeatherIcon from "./WeatherIcon";
import { motion } from "framer-motion";
import {
  Droplets,
  Wind,
  Thermometer,
  ArrowDown,
  ArrowUp,
  Compass,
  Clock,
} from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind, sys } = data;
  const weatherCondition = weather[0];

  console.log({data});
  
  const localTime = new Date();
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to determine background gradient based on weather
  const getBackgroundGradient = () => {
    const condition = weatherCondition.main.toLowerCase();
    if (condition.includes("clear")) {
      return "from-blue-400 to-blue-300";
    } else if (condition.includes("cloud")) {
      return "from-gray-400 to-gray-300";
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      return "from-blue-700 to-blue-500";
    } else if (condition.includes("thunderstorm")) {
      return "from-gray-700 to-gray-600";
    } else if (condition.includes("snow")) {
      return "from-blue-100 to-gray-100";
    } else if (condition.includes("mist") || condition.includes("fog")) {
      return "from-gray-400 to-gray-300";
    } else {
      return "from-blue-300 to-blue-200";
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full mt-6"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden w-full transition-colors">
        <div
          className={`bg-gradient-to-r ${getBackgroundGradient()} dark:opacity-90 p-6`}
        >
          <div className="flex justify-between items-start">
            <div className="text-white">
              <motion.h2 className="text-2xl font-bold" variants={itemVariants}>
                {name}, {sys.country}
              </motion.h2>
              <motion.p
                className="text-white/90 capitalize flex items-center"
                variants={itemVariants}
              >
                <Clock size={14} className="mr-1 opacity-75" />
                {formatTime(localTime)}
              </motion.p>
              <motion.p
                className="mt-2 font-medium text-white/90 capitalize"
                variants={itemVariants}
              >
                {weatherCondition.description}
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <WeatherIcon
                iconCode={weatherCondition.icon}
                description={weatherCondition.description}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-4">
            <div className="flex items-end">
              <div className="text-5xl font-bold text-white">
                {formatTemperature(main.temp)}
              </div>
              <div className="ml-4 text-white/90">
                <div className="flex items-center mb-1">
                  <ArrowUp size={14} className="mr-1" />
                  <span>High: {formatTemperature(main.temp_max)}</span>
                </div>
                <div className="flex items-center">
                  <ArrowDown size={14} className="mr-1" />
                  <span>Low: {formatTemperature(main.temp_min)}</span>
                </div>
              </div>
            </div>
            <p className="text-white/90 flex items-center mt-1">
              <Thermometer size={14} className="mr-1 opacity-75" />
              Feels like {formatTemperature(main.feels_like)}
            </p>
          </motion.div>
        </div>

        <div className="p-6">
          <motion.h3
            className="text-gray-700 dark:text-gray-300 font-medium mb-3"
            variants={itemVariants}
          >
            Weather Details
          </motion.h3>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <Droplets
                size={20}
                className="mr-3 text-blue-500 dark:text-blue-400"
              />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Humidity
                </p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {main.humidity}%
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <Wind
                size={20}
                className="mr-3 text-blue-500 dark:text-blue-400"
              />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Wind Speed
                </p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {wind.speed} m/s
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <Compass
                size={20}
                className="mr-3 text-blue-500 dark:text-blue-400"
              />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Pressure
                </p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {main.pressure} hPa
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center"
              variants={itemVariants}
            >
              <div className="h-5 w-5 mr-3 flex items-center justify-center text-blue-500 dark:text-blue-400">
                <span className="text-lg">👁️</span>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Visibility
                </p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {data.visibility
                    ? `${(data.visibility / 1000).toFixed(1)} km`
                    : "N/A"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
