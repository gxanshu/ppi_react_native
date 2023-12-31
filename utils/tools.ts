export function getFileExtension(url: string): string | null {
  const matches = url.match(/\.([^.]+)$/);
  return matches ? matches[1] : null;
}

export function formatNumber(n: number | undefined): string {
  if(typeof(n) == 'undefined') return "0";
  const suffixes: string[] = ["", "K", "M", "B", "T"];

    if (n < 1000) {
        return n.toString();
    }

    const exp: number = Math.floor((Math.log10(n) - 1) / 3);
    const roundedNumber: number = Math.round(n / Math.pow(10, exp * 3) * 10) / 10;

    return `${roundedNumber}${suffixes[exp]}`;
}