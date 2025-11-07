export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("No URL provided");

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    // Set header agar video bisa di-play
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type"));

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}
