// Constants for DOM elements
const lastUpdatedElement = document.getElementById('lastUpdated');
const activeCasesElement = document.getElementById('activeCases');
const dischargedCasesElement = document.getElementById('dischargedCases');
const deathCasesElement = document.getElementById('deathCases');
const activeChangeElement = document.getElementById('activeChange');
const dischargedChangeElement = document.getElementById('dischargedChange');
const deathChangeElement = document.getElementById('deathChange');
const stateDataElement = document.getElementById('stateData');
const stateSearchElement = document.getElementById('stateSearch');

// API endpoints
const API_URL = 'https://api.rootnet.in/covid19-in/stats/latest';

// List of Indian states with their codes
const STATE_CODES = {
    "Andhra Pradesh": "AP",
    "Arunachal Pradesh": "AR",
    "Assam": "AS",
    "Bihar": "BR",
    "Chhattisgarh": "CT",
    "Goa": "GA",
    "Gujarat": "GJ",
    "Haryana": "HR",
    "Himachal Pradesh": "HP",
    "Jharkhand": "JH",
    "Karnataka": "KA",
    "Kerala": "KL",
    "Madhya Pradesh": "MP",
    "Maharashtra": "MH",
    "Manipur": "MN",
    "Meghalaya": "ML",
    "Mizoram": "MZ",
    "Nagaland": "NL",
    "Odisha": "OR",
    "Punjab": "PB",
    "Rajasthan": "RJ",
    "Sikkim": "SK",
    "Tamil Nadu": "TN",
    "Telangana": "TG",
    "Tripura": "TR",
    "Uttar Pradesh": "UP",
    "Uttarakhand": "UT",
    "West Bengal": "WB",
    "Andaman and Nicobar Islands": "AN",
    "Chandigarh": "CH",
    "Dadra and Nagar Haveli and Daman and Diu": "DN",
    "Delhi": "DL",
    "Jammu and Kashmir": "JK",
    "Ladakh": "LA",
    "Lakshadweep": "LD",
    "Puducherry": "PY"
};

const INDIAN_STATES = Object.keys(STATE_CODES);

// Create suggestions container
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'state-suggestions';
stateSearchElement.parentElement.appendChild(suggestionsContainer);

// Function to format numbers with commas
function formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num || 0);
}

// Function to format date
function formatDate(date) {
    return new Date(date).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}


// Function to show state suggestions
function showStateSuggestions(searchTerm) {
    if (!searchTerm) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    const filteredStates = INDIAN_STATES.filter(state =>
        state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredStates.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    suggestionsContainer.innerHTML = filteredStates
        .map(state => `
            <div class="suggestion-item" data-state="${state}">
                ${state}
            </div>
        `)
        .join('');

    suggestionsContainer.style.display = 'block';
}

// Event listener for search input
stateSearchElement.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    showStateSuggestions(searchTerm);
    filterStates(searchTerm);
});

// Event delegation for suggestion clicks
suggestionsContainer.addEventListener('click', (e) => {
    const suggestionItem = e.target.closest('.suggestion-item');
    if (suggestionItem) {
        const stateName = suggestionItem.dataset.state;
        stateSearchElement.value = stateName;
        filterStates(stateName);
        suggestionsContainer.style.display = 'none';
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!stateSearchElement.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.style.display = 'none';
    }
});

// Function to get state data from API response
function getStateData(apiData, stateName) {
    const possibleNames = STATE_CODES[stateName];
    for (const name of possibleNames) {
        const stateData = apiData.find(state => state.state === name);
        if (stateData) {
            return {
                active: stateData.active || 0,
                recovered: stateData.recovered || 0,
                deaths: stateData.deaths || 0
            };
        }
    }
    return null;
}

// Function to fetch and display COVID data
async function fetchCovidData() {
    try {
        showLoadingState();

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        if (!data.success) {
            throw new Error('API returned unsuccessful response');
        }

        const summary = data.data.summary;
        const stateWiseData = data.data.regional;

        // Update last updated time
        lastUpdatedElement.textContent = formatDate(new Date(data.lastRefreshed));

        // Update total numbers
        activeCasesElement.textContent = formatNumber(summary.total - summary.discharged - summary.deaths);
        dischargedCasesElement.textContent = formatNumber(summary.discharged);
        deathCasesElement.textContent = formatNumber(summary.deaths);

        // Process state data
        const stateDataArray = stateWiseData.map(state => ({
            name: state.loc,
            active: state.totalConfirmed - state.discharged - state.deaths,
            recovered: state.discharged,
            deaths: state.deaths
        }));

        // Sort states alphabetically
        stateDataArray.sort((a, b) => a.name.localeCompare(b.name));

        // Create table rows
        const stateRows = stateDataArray.map(state => `
            <tr>
                <td>${state.name}</td>
                <td>${formatNumber(state.active)}</td>
                <td>${formatNumber(state.recovered)}</td>
                <td>${formatNumber(state.deaths)}</td>
            </tr>
        `).join('');

        // Update state table
        stateDataElement.innerHTML = stateRows;

        // Store the data for search functionality
        window.covidStateData = {};
        stateDataArray.forEach(state => {
            window.covidStateData[state.name] = {
                active: state.active,
                recovered: state.recovered,
                deaths: state.deaths
            };
        });

        // Hide daily changes since they're not available in this API
        activeChangeElement.innerHTML = '';
        dischargedChangeElement.innerHTML = '';
        deathChangeElement.innerHTML = '';

    } catch (error) {
        console.error('Error fetching COVID data:', error);
        
        // Show error message in the stats cards
        activeCasesElement.textContent = 'Error';
        dischargedCasesElement.textContent = 'Error';
        deathCasesElement.textContent = 'Error';
        
        // Show error in the table
        stateDataElement.innerHTML = `
            <tr>
                <td colspan="4">
                    Error loading data. Please check your internet connection and try again.
                    <br>
                    <button onclick="fetchCovidData()" style="margin-top: 10px; padding: 5px 10px; cursor: pointer;">
                        Retry
                    </button>
                </td>
            </tr>
        `;
    }
}

// Function to filter states based on search
function filterStates(searchTerm) {
    if (!window.covidStateData) return;

    const filteredStates = Object.entries(window.covidStateData)
        .filter(([stateName]) => 
            stateName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(([name, data]) => ({
            name,
            ...data
        }));

    if (filteredStates.length === 0) {
        stateDataElement.innerHTML = `
            <tr>
                <td colspan="4">No states found matching your search.</td>
            </tr>
        `;
        return;
    }

    const stateRows = filteredStates.map(state => `
        <tr>
            <td>${state.name}</td>
            <td>${formatNumber(state.active)}</td>
            <td>${formatNumber(state.recovered)}</td>
            <td>${formatNumber(state.deaths)}</td>
        </tr>
    `).join('');

    stateDataElement.innerHTML = stateRows;
}

// Function to show loading state
function showLoadingState() {
    stateDataElement.innerHTML = `
        <tr>
            <td colspan="4" style="text-align: center; padding: 20px;">
                <div class="loading-spinner"></div>
                <p style="margin-top: 10px;">Fetching latest COVID-19 data...</p>
            </td>
        </tr>
    `;
}

// Show loading state before fetching data
showLoadingState();

// Fetch data initially
fetchCovidData();

// Refresh data every 5 minutes
setInterval(fetchCovidData, 5 * 60 * 1000);