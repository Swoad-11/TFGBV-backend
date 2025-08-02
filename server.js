import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http"; // ✅ Needed for Vercel

dotenv.config();
const app = express();
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
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

export const handler = serverless(app);
