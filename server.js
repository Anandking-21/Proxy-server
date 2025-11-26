import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ESP32 Proxy Working");
});

app.post("/sensor-data", async (req, res) => {
  try {
    console.log("📡 Incoming ESP32 Data:", req.body);

    const response = await axios.post(
      "https://teamjal.onrender.com/sensor-data",
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({ success: true, forwarded: response.data });

  } catch (error) {
    console.error("❌ Proxy Error:", error.message);
    res.status(500).json({ error: "Proxy forwarding failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Proxy running on port", port));
