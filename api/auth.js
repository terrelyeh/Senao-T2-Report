export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body || {};
  const expected = process.env.BASIC_AUTH_PASSWORD || "";

  if (password === expected) {
    // Set a cookie that lasts 30 days
    res.setHeader(
      "Set-Cookie",
      `fae_auth=1; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: "Wrong password" });
}
