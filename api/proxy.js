import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing url");

  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    res.setHeader("Content-Type", response.headers.get("content-type") || "video/mp4");
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
