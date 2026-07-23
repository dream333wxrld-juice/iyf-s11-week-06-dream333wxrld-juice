// Task 12.4: Search & Filter

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("city-filter");

let allUsers = [];

async function init() {
    try {
        showLoading();

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        allUsers = await response.json();
        populateCityFilter(allUsers);
        displayUsers(allUsers);

    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function populateCityFilter(users) {
    const cities = [...new Set(users.map(user => user.address.city))];
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

function applyFiltersAndSort() {
    let filtered = [...allUsers];

    // Search filter
    const query = searchInput.value.toLowerCase();
    if (query) {
        filtered = filtered.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    }

    // City filter
    const city = cityFilter.value;
    if (city !== "all") {
        filtered = filtered.filter(user => user.address.city === city);
    }

    // Sort
    const sortValue = sortSelect.value;
    if (sortValue === "az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "za") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayUsers(filtered);
}

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

function displayUsers(users) {
    if (users.length === 0) {
        container.innerHTML = "<p>No users found.</p>";
        return;
    }

    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

// Event listeners
searchInput.addEventListener("input", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);
cityFilter.addEventListener("change", applyFiltersAndSort);

// Initialize
init();