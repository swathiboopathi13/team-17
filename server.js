const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PythonShell } = require("python-shell");
const { spawn } = require("child_process");



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// ========================== LOGIN SYSTEM DATABASE (anganwadi) ==========================
const dbAnganwadi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "swathi",
    database: "anganwadi"
});

dbAnganwadi.connect(err => {
    if (err) {
        console.error("Anganwadi Database Connection Error: ", err);
        throw err;
    }
    console.log("Connected to Anganwadi Database");
});

// ========================== GROWTH MONITORING DATABASE (growth_monitor) ==========================
const dbGrowth = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "swathi",
    database: "growth_monitor"
});

dbGrowth.connect(err => {
    if (err) {
        console.error("Growth Monitoring Database Connection Error: ", err);
        throw err;
    }
    console.log("Connected to Growth Monitoring Database");
});
//===========================ICDS===================//
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change if necessary
    password: "swathi",  // Change if necessary
    database: "icds_db"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to icds database");
    }
});
//================child==============//
const dbchild = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'swathi',
    database: 'registration'
});

dbchild.connect(err => {
    if (err) {
        console.error('Database Connection Failed:', err);
        return;
    }
    console.log('Database registration Connected!');
});
// ========================== LOGIN MODULE ==========================

// Signup API (Without bcrypt)
app.post("/api/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    dbAnganwadi.query(sql, [username, email, password], (err) => {
        if (err) {
            console.error("Signup Error: ", err);
            return res.status(500).json({ message: "Signup failed", error: err });
        }
        res.json({ message: "Signup successful" });
    });
});

// Login API (Without bcrypt)
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";

    dbAnganwadi.query(sql, [username], (err, results) => {
        if (err) {
            console.error("Login Query Error: ", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0 || password !== results[0].password) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.json({ message: "Login successful" });
    });
});

// ========================== GROWTH MONITORING MODULE ==========================
// Store growth data with BMI
app.post("/store-growth", (req, res) => {
    console.log("Received Data:", req.body);

    const { height, weight, bmi } = req.body;
    if (!height || !weight || !bmi) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = "INSERT INTO growth_data (height, weight, bmi) VALUES (?, ?, ?)";
    dbGrowth.query(sql, [height, weight, bmi], (err, result) => {
        if (err) {
            console.error("SQL Error: ", err.message);
            return res.status(500).json({ message: "Error storing data", error: err.message });
        }
        console.log("Data inserted successfully:", result);
        res.json({ message: "Data stored successfully" });
    });
});

// Predict growth using ML model
app.post("/predict-growth", (req, res) => {
    const { height, weight } = req.body;
    console.log("Spawning Python process for growth prediction...");

    const pythonProcess = spawn("python", ["predict_growth.py", height, weight]);

    let predictionOutput = "";

    pythonProcess.stdout.on("data", data => {
        predictionOutput += data.toString();
    });

    pythonProcess.stderr.on("data", data => {
        console.error("Error in ML model:", data.toString());
    });

    pythonProcess.on("close", code => {
        if (code === 0) {
            console.log("Prediction Output:", predictionOutput.trim());
            res.json({ prediction: predictionOutput.trim() });
        } else {
            res.status(500).json({ message: "Error processing prediction" });
        }
    });
});

//===================child module===========//
// Register a child
app.post('/api/register', (req, res) => {
    const { name, parent_name, age, address } = req.body;
    if (!name || !parent_name || !age || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO child_details (name, parent_name, age, address) VALUES (?, ?, ?, ?)";
    dbchild.query(sql, [name, parent_name, age, address], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: "Database Insertion Error" });
        }
        res.json({ message: "Child Registered Successfully!" });
    });
});

app.get('/api/children', (req, res) => {
    dbchild.query("SELECT * FROM child_details", (err, result) => {
        if (err) {
            console.error("Database Fetch Error:", err);
            return res.status(500).json({ message: "Database Fetch Error" });
        }
        console.log("Database Records:", result); // Debug log
        res.json(result);
    });
});

// ========================== START SERVER ==========================
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
