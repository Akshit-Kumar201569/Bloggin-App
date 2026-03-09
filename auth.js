const predefinedUser = {
    username: "admin",
    password: "1234"
};

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === predefinedUser.username && password === predefinedUser.password) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("errorMsg").innerText = "Invalid credentials!";
        }
    });
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

// Protect dashboard
if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}
