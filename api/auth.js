export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let password = "";
  if (typeof req.body === "string") {
    password = JSON.parse(req.body).password || "";
  } else if (req.body) {
    password = req.body.password || "";
  }

  const expected = process.env.BASIC_AUTH_PASSWORD || "";

  if (expected && password === expected) {
    res.setHeader(
      "Set-Cookie",
      "fae_auth=1; Path=/; Max-Age=2592000; SameSite=Lax"
    );
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: "Wrong password" });
}
