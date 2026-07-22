// Day 3: Error Handling

async function fetchUserSafely(userId) {
    const defaultUser = {
        id: 0,
        name: "Guest User",
        email: "guest@example.com"
    };

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (response.status === 404) {
            console.log("User not found, returning default user");
            return defaultUser;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        return user;

    } catch (error) {
        console.error("Fetch failed:", error.message);
        return defaultUser;
    }
}

// Test with a valid user
fetchUserSafely(1).then(user => console.log("Valid user:", user));

// Test with an invalid user (should return default)
fetchUserSafely(9999).then(user => console.log("Invalid user (default returned):", user));