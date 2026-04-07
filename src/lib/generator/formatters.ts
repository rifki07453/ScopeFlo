export function formatCurrency(amount: string): string {
  // Simple heuristic: if it's already a formatted string with a symbol, keep it. 
  // Otherwise try to convert to a number and format as USD.
  const num = parseFloat(amount.replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

export function formatBulletPoints(text: string): string[] {
  return text
    .split('\n')
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map(t => t.replace(/^[-*•]\s*/, '')); // Remove common bullet markers
}

export function getCurrentDateFormatted(): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());
}
