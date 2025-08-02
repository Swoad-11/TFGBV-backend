import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

app.use(cors());
app.use(express.json());

// Root route to verify server
app.get("/", (req, res) => {
  res.send("✅ TFGBV Reporting API is running.");
});

// Fetch reports from Google Sheets
app.get("/api/reports", async (req, res) => {
  try {
    if (!GOOGLE_APPS_SCRIPT_URL) {
      return res.status(500).json({ error: "GOOGLE_SCRIPT_URL is not set" });
    }
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// ✅ Run locally only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on http://localhost:${PORT}`);
  });
}

export default app;
