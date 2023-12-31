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

export function formatDateString(isoDateString: string): string {
  const date = new Date(isoDateString);

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours() % 12 || 12;
  const minute = date.getMinutes();
  const period = date.getHours() >= 12 ? 'PM' : 'AM';

  const formattedDate = `${month} ${day}, ${year} ${hour}:${minute.toString().padStart(2, '0')} ${period}`;

  return formattedDate;
}