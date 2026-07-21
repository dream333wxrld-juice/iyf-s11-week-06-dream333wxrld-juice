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