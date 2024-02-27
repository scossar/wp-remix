export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…"; // Using an ellipsis character
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}
