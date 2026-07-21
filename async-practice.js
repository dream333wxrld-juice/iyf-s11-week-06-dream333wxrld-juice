// Task 11.1: Understanding Async

// Exercise 1: Synchronous vs Asynchronous
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

// Asynchronous example
console.log("--- Async example ---");
console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");

// Predict the output exercise
console.log("--- Predict output ---");
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");
// Actual order: A, C, E, B, D

// Exercise 2: Callback Pattern
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});

// Build: loadUser function
function loadUser(userId, callback) {
    setTimeout(() => {
        const user = { id: userId, name: "Gilbert Mungai", role: "Student" };
        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("User loaded:", user);
});

// Task 11.2: Callback Hell & Introduction to Promises

// Exercise 1: Callback Hell (the bad way)
function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}

// The nightmare - callback hell demonstration
getUserData(1, function(user) {
    console.log("User:", user);
    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);
        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});

// Exercise 2: Promises to the Rescue
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("It worked!");
        } else {
            reject("Something went wrong");
        }
    }, 1000);
});

myPromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// Refactor getUserData to return a Promise
function getUserDataPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

// Refactor getUserPosts to return a Promise
function getUserPostsPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

// Refactor getPostComments to return a Promise
function getPostCommentsPromise(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

// Test the Promise versions
getUserDataPromise(1)
    .then(user => console.log("Promise version - User:", user))
    .catch(error => console.error(error));

// Task 11.3: Promise Chaining

// Exercise 1: Chain Promises
getUserDataPromise(1)
    .then(user => {
        console.log("User:", user);
        return getUserPostsPromise(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostCommentsPromise(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Exercise 2: Promise.all
const promise1 = getUserDataPromise(1);
const promise2 = getUserDataPromise(2);
const promise3 = getUserDataPromise(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All users:", results);
    })
    .catch(error => {
        console.error("One failed:", error);
    });

// Exercise 3: Promise.race
const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 500));

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });

// Build: Fetch data for 3 users simultaneously and display them all at once
async function fetchAllUsers() {
    const users = await Promise.all([
        getUserDataPromise(1),
        getUserDataPromise(2),
        getUserDataPromise(3)
    ]);
    console.log("All 3 users fetched simultaneously:", users);
}

fetchAllUsers();  

// Task 11.4: Async/Await

// Exercise 1: Converting to Async/Await

// Promise chain version:
function getDataWithPromises() {
    return getUserDataPromise(1)
        .then(user => getUserPostsPromise(user.id))
        .then(posts => getPostCommentsPromise(posts[0].id))
        .then(comments => comments);
}

// Async/await version (much cleaner!):
async function getDataWithAsync() {
    const user = await getUserDataPromise(1);
    const posts = await getUserPostsPromise(user.id);
    const comments = await getPostCommentsPromise(posts[0].id);
    return comments;
}

// Using it
getDataWithAsync().then(comments => console.log("Async/await result:", comments));

// Exercise 2: Error Handling with Try/Catch
async function fetchUserData(userId) {
    try {
        const user = await getUserDataPromise(userId);
        const posts = await getUserPostsPromise(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
}

fetchUserData(1)
    .then(data => console.log("Fetched data:", data))
    .catch(error => console.error("Caught error:", error));

// Test error case
fetchUserData(-1)
    .then(data => console.log("Fetched data:", data))
    .catch(error => console.error("Caught error for invalid ID:", error));

// Exercise 3: Parallel with Async/Await
async function getAllUsersSequential() {
    console.log("--- Sequential (slow) ---");
    const startTime = Date.now();

    const user1 = await getUserDataPromise(1);
    const user2 = await getUserDataPromise(2);
    const user3 = await getUserDataPromise(3);

    console.log(`Sequential time: ${Date.now() - startTime}ms`);
    return [user1, user2, user3];
}

async function getAllUsersParallel() {
    console.log("--- Parallel (fast) ---");
    const startTime = Date.now();

    const [u1, u2, u3] = await Promise.all([
        getUserDataPromise(1),
        getUserDataPromise(2),
        getUserDataPromise(3)
    ]);

    console.log(`Parallel time: ${Date.now() - startTime}ms`);
    return [u1, u2, u3];
}

getAllUsersSequential().then(users => console.log("Sequential users:", users));
getAllUsersParallel().then(users => console.log("Parallel users:", users));

// Build: Rewrite callback hell using async/await
async function getCommentsAsync() {
    try {
        const user = await getUserDataPromise(1);
        console.log("User (async):", user);
        const posts = await getUserPostsPromise(user.id);
        console.log("Posts (async):", posts);
        const comments = await getPostCommentsPromise(posts[0].id);
        console.log("Comments (async):", comments);
        return comments;
    } catch (error) {
        console.error("Error in async chain:", error);
    }
}

getCommentsAsync();
