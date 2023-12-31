export function getFileExtension(url: string): string | null {
  const matches = url.match(/\.([^.]+)$/);
  return matches ? matches[1] : null;
}