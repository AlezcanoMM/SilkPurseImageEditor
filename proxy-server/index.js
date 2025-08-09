require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;
const TOKEN = process.env.PROXY_TOKEN;
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }));

app.post('/submit-order', async (req, res) => {
  try {
    const formData = new URLSearchParams(req.body);
    formData.append('token', TOKEN);

    const googleRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const data = await googleRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ success: false, error: 'Proxy server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

app.get('/get-shape', async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ success: false, error: "No code provided" });
    }

    const url = `${GOOGLE_SCRIPT_URL}?token=${TOKEN}&code=${encodeURIComponent(code)}`;
    const googleRes = await fetch(url);
    const data = await googleRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ success: false, error: 'Proxy server error' });
  }
});
