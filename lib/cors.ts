// lib/cors.ts
export function getCorsHeaders(request: Request) {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://ibetalife.vercel.app",
  ];

  const origin = request.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin);

  const headers = new Headers();
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Allow-Origin", isAllowed ? origin : "");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return headers;
}
