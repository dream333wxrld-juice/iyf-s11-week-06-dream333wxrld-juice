// Day 4: Rewrite with Async/Await

// Original callback-based functions (from Task 11.2)
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

// OLD WAY: Callback Hell
console.log("--- Old callback way ---");
getUserData(1, function(user) {
    console.log("User:", user);
    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);
        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});

// NEW WAY: Promisified versions
function getUserDataP(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ id: userId, name: "John" }), 1000);
    });
}

function getUserPostsP(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]), 1000);
    });
}

function getPostCommentsP(postId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]), 1000);
    });
}

// NEW WAY: Rewritten with async/await
async function getFullDataAsync() {
    console.log("--- New async/await way ---");
    try {
        const user = await getUserDataP(1);
        console.log("User:", user);

        const posts = await getUserPostsP(user.id);
        console.log("Posts:", posts);

        const comments = await getPostCommentsP(posts[0].id);
        console.log("Comments:", comments);

        return comments;
    } catch (error) {
        console.error("Error:", error);
    }
}

getFullDataAsync();