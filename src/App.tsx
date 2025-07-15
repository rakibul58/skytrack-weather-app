import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { toggleDarkMode } from "./store/weatherSlice";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import SearchHistory from "./components/SearchHistory";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const App = () => {
  const { data, loading, error, darkMode } = useSelector(
    (state: RootState) => state.weather
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="w-full max-w-xl flex justify-between items-center py-6 px-4 sm:px-0">
        <motion.h1
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SkyTrack
        </motion.h1>
        <motion.button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 dark:text-gray-200"
          aria-label="Toggle dark mode"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </header>

      <main className="w-full max-w-xl flex flex-col items-center px-4 sm:px-0">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchBar />
        </motion.div>

        {loading && <LoadingSpinner />}

        {error && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorMessage message={error} />
          </motion.div>
        )}

        {!loading && !error && data && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <WeatherCard data={data} />
          </motion.div>
        )}

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SearchHistory />
        </motion.div>
      </main>

      <footer className="mt-auto py-6 w-full text-center text-gray-700 dark:text-gray-600 text-sm">
        <p>SkyTrack App © {new Date().getFullYear()}</p>
        <p className="mt-1">Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default App;
