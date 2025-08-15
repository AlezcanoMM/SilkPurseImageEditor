// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.PROXY_TOKEN;
const GAS_URL = process.env.GOOGLE_SCRIPT_URL;

// Helper to turn Google Drive fileId into Drive download URL
function makeDriveUrl(fileId) {
  if (!fileId) return null;
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

// Proxy route to serve Google Drive images with proper CORS headers (streaming)
app.get("/proxy/:fileId", async (req, res) => {
  const { fileId } = req.params;
  if (!fileId) return res.status(400).send("Missing file ID");

  try {
    const driveUrl = makeDriveUrl(fileId);
    const driveRes = await fetch(driveUrl);

    if (!driveRes.ok) {
      return res.status(driveRes.status).send("Error fetching file");
    }

    // Forward content type
    res.set("Content-Type", driveRes.headers.get("content-type") || "image/png");
    res.set("Access-Control-Allow-Origin", "*");

    // Stream the response body directly to the client
    driveRes.body.pipe(res);

    driveRes.body.on("error", (err) => {
      console.error("Streaming error:", err);
      res.status(500).end("Stream error");
    });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy server error");
  }
});

// Main route to get shape data (returns proxy URLs)
app.get("/get-shape", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.json({ success: false, error: "No code provided" });
  }

  try {
    const gasRes = await fetch(`${GAS_URL}?code=${encodeURIComponent(code)}`);
    const data = await gasRes.json();

    if (!data.success) {
      return res.json(data);
    }

    //return proxy links
    res.json({
      success: true,
      shapeUrl: data.shapeId ? `https://${req.get("host")}/proxy/${data.shapeId}` : null,
      listingUrl: data.listingId ? `https://${req.get("host")}/proxy/${data.listingId}` : null,
      fontsUrl: data.fontsId ? `https://${req.get("host")}/proxy/${data.fontsId}` : null,
      motifUrl: data.motifId ? `https://${req.get("host")}/proxy/${data.motifId}` : null,
      fileName: data.fileName
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: "Server error" });
  }
});

// --- POST submit order ---
app.post("/submit-order", async (req, res) => {
  try {
    const formData = new URLSearchParams(req.body);
    formData.append("token", TOKEN);

    const googleRes = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await googleRes.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("P1 error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
