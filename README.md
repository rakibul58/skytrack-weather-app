# SkyTrack - Weather App

A responsive weather application built with React.js, TypeScript, Redux, and Tailwind CSS that allows users to search for cities and view current weather information.

## Live Demo

Check out the live site: [Live](https://sky-track-weather-app.vercel.app/)

## Features

- Search for cities to view current weather data
- Display of temperature, weather conditions, humidity, and wind speed
- Dark mode toggle
- Recent search history with localStorage persistence
- Responsive design for all screen sizes
- Error handling and loading states

## Technologies Used

- React.js (with functional components and hooks)
- TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- OpenWeatherMap API for weather data

## Project Structure

```
src/
  ├── components/
  │   ├── SearchBar.tsx      # Search input component
  │   ├── WeatherCard.tsx    # Main weather display component
  │   ├── LoadingSpinner.tsx # Loading state component
  │   ├── ErrorMessage.tsx   # Error handling component
  │   ├── WeatherIcon.tsx    # Weather icon component
  │   └── SearchHistory.tsx  # Recent searches component
  ├── store/
  │   ├── store.ts           # Redux store configuration
  │   ├── weatherSlice.ts    # Weather reducer and actions
  │   └── thunks.ts          # Async actions for API calls
  ├── types/
  │   └── index.ts           # TypeScript type definitions
  ├── utils/
  │   └── helper.ts         # Helper functions
  ├── App.tsx                # Main application component
  ├── index.tsx              # Entry point
  └── index.css              # Global styles & Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/rakibul58/skytrack-weather-app.git
   cd skytrack-weather-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key

   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm start
   ```

## Usage

1. Enter a city name in the search bar
2. View the current weather conditions
3. Toggle dark mode using the button in the header
4. Click on a city in the recent searches to quickly look up its weather again

## Bonus Features Implemented

- **Dark Mode**: Toggle between light and dark themes
- **Search History**: View and click on recent searches
- **Enhanced UI**: Clean, responsive design with thoughtful user experience

## Deployment

This app is deployed on [Vercel] and can be accessed at [https://sky-track-weather-app.vercel.app/].

## License

MIT

## Acknowledgements

- OpenWeatherMap for providing the weather data API
- Tailwind CSS for the utility-first CSS framework
- React and Redux teams for the amazing libraries
