const express = require("express");
const path = require("path");
const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact"
    });
});

app.get("/signup", (req, res) => {
    res.render("signUp", {
        title: "Sign UP"
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

app.get("/forgotpassword", (req, res) => {
    res.render("forgotPassword", {
        title: "Forgot Password"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help & Support"
    });
});

app.get("/employees", (req, res) => {
    res.render("employees", {
        title: "Employees"
    });
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        title: "Dashboard"
    });
});
app.get("/employee/add", (req, res) => {
    res.render("add-employee", {
        title: "Add Employee"
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us"
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
