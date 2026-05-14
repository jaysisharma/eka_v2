const formatterCache = new Map<string, Intl.NumberFormat>();

function getFormatter(locale: string) {
  const currency = getCurrencyCode(locale);
  const key = `${locale}-${currency}`;

  if (!formatterCache.has(key)) {
    formatterCache.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    );
  }

  return formatterCache.get(key)!;
}

export function formatCurrency(amount: number): string {
  try {
    const locale =
      typeof window !== "undefined"
        ? window.navigator.language
        : "en-US";

    return getFormatter(locale).format(amount);
  } catch {
    return "$0";
  }
}

function getCurrencyCode(locale: string): string {
  if (locale.includes("IN")) return "INR";
  if (locale.includes("GB")) return "GBP";
  if (
    locale.includes("EU") ||
    locale.includes("DE") ||
    locale.includes("FR")
  )
    return "EUR";
  if (locale.includes("JP")) return "JPY";

  return "USD";
}

export function getCurrencySymbol(): string {
  try {
    const locale =
      typeof window !== "undefined"
        ? window.navigator.language
        : "en-US";

    const formatter = getFormatter(locale);

    const parts = formatter.formatToParts(0);

    return (
      parts.find((part) => part.type === "currency")?.value || "$"
    );
  } catch {
    return "$";
  }
}