import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchWeather } from "../store/thunks";
import { clearSearchHistory } from "../store/weatherSlice";
import { motion } from "framer-motion";
import { Clock, X, RefreshCw } from "lucide-react";

const SearchHistory: React.FC = () => {
  const { searchHistory } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

  if (searchHistory.length === 0) {
    return null;
  }

  const handleCityClick = (city: string) => {
    dispatch(fetchWeather(city));
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Clock size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Recent Searches
          </h3>
        </div>
        <motion.button
          onClick={handleClearHistory}
          className="flex items-center px-2 py-1 text-sm text-red-500 hover:text-red-700 
                     hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={14} className="mr-1" />
          Clear All
        </motion.button>
      </div>

      <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
        {searchHistory.map((city, index) => (
          <motion.button
            key={`${city}-${index}`}
            onClick={() => handleCityClick(city)}
            className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 
                     rounded-full text-sm text-gray-700 dark:text-gray-300 
                     hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#dbeafe",
              color: "#1e40af",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={14} className="mr-1.5 opacity-70" />
            {city}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SearchHistory;
