// Task 12.3: Post Form Logic

const form = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const result = document.getElementById("result");

async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            userId
        })
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) return;

    try {
        const newPost = await createPost(title, body, 1);

        result.innerHTML = `
            <strong>Post Created!</strong><br>
            <strong>ID:</strong> ${newPost.id}<br>
            <strong>Title:</strong> ${newPost.title}<br>
            <strong>Body:</strong> ${newPost.body}
        `;
        result.classList.add("show");

        form.reset();

    } catch (error) {
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
        result.classList.add("show");
    }
});