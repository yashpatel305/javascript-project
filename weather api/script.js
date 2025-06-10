// WeatherAPI.com configuration
const API_KEY = '9c9239eed2494fcb8a054440251006'; // WeatherAPI.com API key
const BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const citySearch = document.getElementById('citySearch');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDescription = document.getElementById('weatherDescription');
const feelsLike = document.getElementById('feelsLike');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecastContainer');
const loadingOverlay = document.getElementById('loadingOverlay');

// Create suggestions container
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'search-suggestions';
suggestionsContainer.style.display = 'none';
citySearch.parentElement.appendChild(suggestionsContainer);

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = citySearch.value.trim();
    if (city) {
        getWeatherData(city);
        suggestionsContainer.style.display = 'none';
    }
});

citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = citySearch.value.trim();
        if (city) {
            getWeatherData(city);
            suggestionsContainer.style.display = 'none';
        }
    }
});

// Add input event listener for suggestions
let debounceTimer;
citySearch.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const searchTerm = e.target.value.trim();
    
    if (searchTerm.length < 1) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    debounceTimer = setTimeout(() => {
        getCitySuggestions(searchTerm);
    }, 300);
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!citySearch.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.style.display = 'none';
    }
});

// Helper Functions
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// City Suggestions
async function getCitySuggestions(query) {
    try {
        const response = await fetch(
            `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
        }
        
        const cities = await response.json();
        displaySuggestions(cities);
        
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

function displaySuggestions(cities) {
    if (!cities.length) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    cities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        
        // Create location text with city and region/country
        const locationText = `${city.name}${city.region ? ', ' + city.region : ''}, ${city.country}`;
        
        suggestionItem.innerHTML = `
            <span class="city">${city.name}</span>
            <span class="region">${city.region ? city.region + ', ' : ''}${city.country}</span>
        `;
        
        suggestionItem.addEventListener('click', () => {
            citySearch.value = locationText;
            getWeatherData(locationText);
            suggestionsContainer.style.display = 'none';
        });
        
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    suggestionsContainer.style.display = 'block';
}

// API Calls
async function getWeatherData(city) {
    try {
        // Check if API key has been set
        if (API_KEY === 'YOUR_API_KEY') {
            throw new Error('Please replace YOUR_API_KEY with an actual API key from weatherapi.com');
        }

        showLoading();
        
        // Build the URL with proper encoding
        const encodedCity = encodeURIComponent(city);
        const apiUrl = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodedCity}&days=5&aqi=yes`;
        
        console.log('Attempting to fetch weather data...');
        
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        
        if (!response.ok) {
            console.error('API Response:', responseData);
            if (responseData.error) {
                throw new Error(`API Error: ${responseData.error.message}`);
            } else {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
        }
        
        console.log('Weather data received:', responseData);
        
        updateCurrentWeather(responseData);
        updateForecast(responseData);
        
    } catch (error) {
        console.error('Error details:', error);
        if (error.message.includes('API key')) {
            alert('API Key Error: ' + error.message);
        } else if (error.message.includes('Failed to fetch')) {
            alert('Network Error: Please check your internet connection');
        } else {
            alert('Error: ' + error.message);
        }
    } finally {
        hideLoading();
    }
}

function updateCurrentWeather(data) {
    const current = data.current;
    const location = data.location;
    
    cityName.textContent = `${location.name}, ${location.country}`;
    currentDate.textContent = formatDate(location.localtime);
    temperature.textContent = Math.round(current.temp_c);
    weatherIcon.src = `https:${current.condition.icon}`;
    weatherDescription.textContent = current.condition.text;
    feelsLike.textContent = `${Math.round(current.feelslike_c)}°C`;
    windSpeed.textContent = `${Math.round(current.wind_kph)} km/h`;
    humidity.textContent = `${current.humidity}%`;
    pressure.textContent = `${current.pressure_mb} hPa`;
}

function updateForecast(data) {
    forecastContainer.innerHTML = '';
    
    data.forecast.forecastday.forEach(day => {
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        
        forecastCard.innerHTML = `
            <div class="forecast-date">${formatDate(day.date)}</div>
            <img src="https:${day.day.condition.icon}" 
                 alt="${day.day.condition.text}">
            <div class="forecast-temp">${Math.round(day.day.avgtemp_c)}°C</div>
            <div class="forecast-description">${day.day.condition.text}</div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Initialize with a default city
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData('Mumbai');
});
