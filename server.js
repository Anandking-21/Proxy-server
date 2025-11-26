// server.js - simple HTTP -> HTTPS proxy for ESP32
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const BACKEND = process.env.RENDER_BACKEND_URL || "https://teamjal.onrender.com";

// health
app.get("/", (req, res) => res.send("ESP32 Proxy alive"));

// forward POSTs and other routes
app.all("/sensor-data", async (req, res) => {
  try {
    // Forward the request body to your Render backend securely
    const response = await axios({
      url: `${BACKEND}/sensor-data`,
      method: req.method,
      data: req.body,
      headers: { "Content-Type": "application/json" },
      timeout: 15000
    });

    // return the backend response to the ESP32
    res.status(response.status).send(response.data);
  } catch (err) {
    console.error("Proxy error:", err.message || err);
    res.status(500).json({ error: "Proxy forwarding failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy server running on port", PORT));
