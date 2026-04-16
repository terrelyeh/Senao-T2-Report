export const config = {
  matcher: ["/((?!api|_vercel|login\\.html|Senao.*\\.png|EnGenius.*\\.png|favicon\\.ico).*)"],
};

export default function middleware(request) {
  const cookie = request.headers.get("cookie") || "";
  const isAuthed = cookie.split(";").some((c) => c.trim().startsWith("fae_auth="));

  if (isAuthed) {
    return undefined; // allow through
  }

  // Redirect to login page
  const url = new URL("/login.html", request.url);
  return Response.redirect(url.toString(), 302);
}
