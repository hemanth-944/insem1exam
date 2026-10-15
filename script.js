let users = JSON.parse(localStorage.getItem("users")) || [];

function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("message").innerText = "";
}

function showSignup() {
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("message").innerText = "";
}

// Signup
document.getElementById("signupForm").onsubmit = function(e) {
    e.preventDefault();

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if (users.some(user => user.email === email)) {
        document.getElementById("message").innerText =
            "Email already registered!";
        return;
    }

    users.push({ name, email, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    this.reset();
    showLogin();
};

// Login
document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        document.getElementById("auth").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");
        document.getElementById("studentName").innerText = user.name;
        document.getElementById("message").innerText = "";
        this.reset();
    } else {
        document.getElementById("message").innerText =
            "Invalid email or password!";
    }
};

// Department details
function showDepartment(dept) {
    let departments = {
        CSE: "Computer Science: Programming, AI, Web Development and Software Engineering.",
        ECE: "Electronics: Electronic Circuits, Communication Systems and Embedded Systems.",
        EEE: "Electrical: Electrical Machines, Power Systems and Control Systems.",
        MECH: "Mechanical: Manufacturing, Machine Design and Thermal Engineering.",
        CIVIL: "Civil Engineering: Construction, Structural Design and Transportation.",
        IT: "Information Technology: Networking, Databases, Cybersecurity and Web Technologies."
    };

    document.getElementById("deptTitle").innerText =
        dept + " Department";

    document.getElementById("deptDescription").innerText =
        departments[dept];

    document.getElementById("departmentDetails")
        .classList.remove("hidden");

    document.getElementById("departmentDetails")
        .scrollIntoView({ behavior: "smooth" });
}

function closeDepartment() {
    document.getElementById("departmentDetails")
        .classList.add("hidden");
}

// Logout
function logout() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("auth").classList.remove("hidden");
    showLogin();
}