export const config = { matcher: "/(.*)" };

export default function middleware(request) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [u, ...pParts] = decoded.split(":");
      const p = pParts.join(":");

      if (u === user && p === pass) {
        return undefined;
      }
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Senao T2 FAE Reports"',
    },
  });
}
