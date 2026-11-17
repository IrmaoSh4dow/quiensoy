const SMALL_WORDS = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'y', 'the', 'of']);

export function monogram(name: string): string {
  const words = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 0 && !SMALL_WORDS.has(word.toLowerCase()));

  if (words.length === 0) return 'QS';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}
