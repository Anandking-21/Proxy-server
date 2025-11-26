const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TARGET = "https://teamjal.onrender.com";  // your real backend

app.all("/*", async (req, res) => {
  try {
    const url = TARGET + req.originalUrl;
    const response = await axios({
      url,
      method: req.method,
      data: req.body,
      headers: req.headers,
    });

    res.status(response.status).send(response.data);
  } catch (err) {
    res.status(500).send({ error: "Proxy Error", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running on port", PORT));
