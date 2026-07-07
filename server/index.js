const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();

// ---------------------------------------------------------------
// SQLite — persistent DB stored as a file next to this script
// ---------------------------------------------------------------
const db = new Database(path.join(__dirname, "vernacular_stem.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL,
    email         TEXT    UNIQUE NOT NULL,
    password_hash TEXT    NOT NULL,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Prepared statements (compiled once, re-used on every call — fast & safe)
const stmtFindByEmail  = db.prepare("SELECT * FROM users WHERE email = ?");
const stmtInsertUser   = db.prepare(
  "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)"
);

// ---------------------------------------------------------------
// CORS — Allow all origins for hackathon simplicity
// ---------------------------------------------------------------
app.use(cors());
app.use(express.json());

// Simple email helper
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ---------------------------------------------------------------
// Health check
// ---------------------------------------------------------------
app.get("/", (_req, res) => {
  const userCount = db.prepare("SELECT COUNT(*) AS count FROM users").get();
  res.json({ status: "ok", message: "Backend is working", users: userCount.count });
});

// ---------------------------------------------------------------
// SIGNUP
// ---------------------------------------------------------------
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || typeof name !== "string" || name.trim().length < 2)
      return res.status(400).json({ error: "Name must be at least 2 characters." });
    if (!email || !isValidEmail(email))
      return res.status(400).json({ error: "A valid email address is required." });
    if (!password || typeof password !== "string" || password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters." });

    const normalizedEmail = email.trim().toLowerCase();

    if (stmtFindByEmail.get(normalizedEmail)) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    stmtInsertUser.run(name.trim(), normalizedEmail, passwordHash);

    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// ---------------------------------------------------------------
// LOGIN
// ---------------------------------------------------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !isValidEmail(email))
      return res.status(400).json({ error: "A valid email address is required." });
    if (!password || typeof password !== "string")
      return res.status(400).json({ error: "Password is required." });

    const normalizedEmail = email.trim().toLowerCase();
    const user = stmtFindByEmail.get(normalizedEmail);

    // Always run bcrypt.compare to prevent timing-based user-enumeration
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password_hash)
      : await bcrypt.compare(password, "$2b$10$invalidhashfortimingnormalization.");

    if (!user || !passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({
      message: "Login successful.",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// ---------------------------------------------------------------
// FORGOT PASSWORD
// ---------------------------------------------------------------
app.post("/forgot-password", (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email))
      return res.status(400).json({ error: "A valid email address is required." });

    const normalizedEmail = email.trim().toLowerCase();

    // Always return the same response to prevent user-enumeration
    const user = stmtFindByEmail.get(normalizedEmail);
    if (user) {
      // TODO: generate a real token and send reset email via nodemailer/SendGrid
      console.log(`[mock] Password reset requested for ${normalizedEmail}`);
    }

    res.json({ message: "If an account with that email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Forgot-password error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// ---------------------------------------------------------------
// START SERVER
// ---------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${path.join(__dirname, "vernacular_stem.db")}`);
});
