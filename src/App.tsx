import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { toggleDarkMode } from './store/weatherSlice';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchHistory from './components/SearchHistory';

const App: React.FC = () => {
  const { data, loading, error, darkMode } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch();

  // Apply dark mode to the HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 sm:p-8 transition-colors ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Weather App</h1>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
      </header>

      <main className="w-full max-w-md flex flex-col items-center">
        <SearchBar />
        
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && data && <WeatherCard data={data} />}
        
        <SearchHistory />
      </main>

      <footer className="mt-auto pt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Weather App © {new Date().getFullYear()}</p>
        <p className="mt-1">Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default App;