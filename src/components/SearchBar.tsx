import { useState, FormEvent, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchWeather } from "../store/thunks";
import { motion } from "framer-motion";
import { Search, MapPin, X } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchWeather(searchTerm.trim()));
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const popularCities = ["London", "New York", "Tokyo", "Paris", "Sydney"];

  const handleCityClick = (city: string) => {
    dispatch(fetchWeather(city));
    setSearchTerm(city);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <motion.div
          className={`flex items-center border-2 ${
            isFocused ? "border-blue-400" : "border-gray-300"
          } 
            rounded-lg overflow-hidden shadow-lg dark:bg-gray-800 bg-white transition-all duration-200`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex-shrink-0 pl-3 text-gray-400">
            <Search size={20} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for a city..."
            className="w-full px-3 py-3 focus:outline-none bg-transparent dark:text-white text-gray-700"
            aria-label="Search for a city"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 px-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}

          <motion.button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 font-medium transition-colors h-full"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!searchTerm.trim()}
          >
            Search
          </motion.button>
        </motion.div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        {popularCities.map((city) => (
          <motion.button
            key={city}
            onClick={() => handleCityClick(city)}
            className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 
              dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-sm 
              dark:text-gray-200 text-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin size={14} className="mr-1" />
            {city}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
