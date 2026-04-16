export const config = { runtime: "edge" };

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json();
  const password = body.password || "";
  const expected = process.env.BASIC_AUTH_PASSWORD || "";

  if (password === expected) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `fae_auth=1; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`,
      },
    });
  }

  return new Response(JSON.stringify({ error: "Wrong password" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
