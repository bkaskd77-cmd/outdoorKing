export function shouldRunIntl(pathname: string): boolean {
  return !(
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/monitoring")
  );
}
