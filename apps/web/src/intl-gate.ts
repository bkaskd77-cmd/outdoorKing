export function shouldRunIntl(pathname: string): boolean {
  return !(
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/monitoring") ||
    pathname === "/sw.js" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/offline.html" ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/media/")
  );
}
