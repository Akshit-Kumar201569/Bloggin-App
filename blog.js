let posts = JSON.parse(localStorage.getItem("posts")) || [];
let editingIndex = null;

// Display all posts (Public Page)
const postsContainer = document.getElementById("postsContainer");

if (postsContainer) {
    displayPosts();
}

function displayPosts() {
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        postsContainer.innerHTML += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            </div>
        `;
    });
}

// Dashboard logic
const postForm = document.getElementById("postForm");
const userPosts = document.getElementById("userPosts");

if (postForm) {
    displayUserPosts();

    postForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        if (editingIndex === null) {
            posts.push({ title, content });
        } else {
            posts[editingIndex] = { title, content };
            editingIndex = null;
        }

        localStorage.setItem("posts", JSON.stringify(posts));
        postForm.reset();
        displayUserPosts();
    });
}

function displayUserPosts() {
    userPosts.innerHTML = "";
    posts.forEach((post, index) => {
        userPosts.innerHTML += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
            </div>
        `;
    });
}

function editPost(index) {
    document.getElementById("title").value = posts[index].title;
    document.getElementById("content").value = posts[index].content;
    editingIndex = index;
}

function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayUserPosts();
}
