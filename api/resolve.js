export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send("No URL provided");

  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    // ambil final URL (biasanya redirect ke googlevideo.com)
    const finalUrl = response.url;
    res.json({ direct: finalUrl });
  } catch (err) {
    res.status(500).send("Resolver error: " + err.message);
  }
}
