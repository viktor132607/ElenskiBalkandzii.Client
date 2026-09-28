export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  (process.env.NODE_ENV === "production"
    ? "https://elenskibalkandzii-server.onrender.com"
    : "http://localhost:5000");

export function apiUrl(path: string): string {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function imageUrl(path: string): string {
  return path.startsWith('/api/images/') ? apiUrl(path) : path;
}
