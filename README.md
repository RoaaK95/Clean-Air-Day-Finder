# Clean-Air Day Finder  
  
- A React + TypeScript web app that helps you find the **best outdoor time windows** based on **air quality** and **weather conditions**.  
- Powered by [Open-Meteo](https://open-meteo.com) APIs (free, no key required).
- [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://clean-air-day-finder-255w.vercel.app/)

  
## 🚀 Features
- 🔍**City search** (via Open-Meteo Geocoding API)
- 📍 **Use my location** (Geolocation API)
- 🌤️ **Air quality forecast** (PM2.5, PM10, Ozone)
- 🌡️ **Weather forecast** (temperature, wind, humidity)
- ✅ **Green window detection** — highlights continuous periods of safe & comfortable outdoor air
- 📊 **Interactive charts** for PM2.5 and temperature
- 💡 **Hourly tags** for quick at-a-glance conditions
- ♻️ Environment-focused project: helps people choose low-pollution times for exercise, commuting, or outdoor activities.

## 🛠️ Tech Stack
- React TypeScript
- React Router for routing
- TanStack Query (React Query)]for server state
- Zod for schema validation
- Rechartsfor data visualization
- date-fns for time formatting
- CSS Modules for styling

## 📁 Project Structure

 <img width="508" height="219" alt="project-setup" src="https://github.com/user-attachments/assets/55a5f860-b0d6-4395-a60e-fe1d79d5e264" />


## 📷 Screenshots

- Homepage : Search a city or use current location.  
  <img width="893" height="269" alt="homepage" src="https://github.com/user-attachments/assets/bbf47976-6e7f-47ef-8bd9-e40349665e6d" />

- Results Page : Green windows, chart, hourly tags.  
  <img width="893" height="841" alt="resultsPage" src="https://github.com/user-attachments/assets/b4565c95-2e67-4b00-a310-6b2306bfd274" />


## 📦 Usage Example  
  
 - Open the app
 - Search “Baghdad” or click Use my location  
 - View top green windows like “Tue 06:00 → Tue 09:00 · 3h”
 - Scroll the chart to see how PM2.5 & temp vary
 - Use hourly tags to see “Good / Fair / Poor” for each hour

## 🌱 Why This Project?
  
- Helps people plan outdoor time when air is cleaner  
- Raises awareness of hourly air pollution variations  
- A simple, practical tool with real health + environment impact

## 👥 Contributing

Feel free to fork, open issues, or send PRs. Let’s make outdoor time safer and cleaner together.
