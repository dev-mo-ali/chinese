export function selectReminderWords(words, settings, isFavorite) {
  const units = new Set(settings.units || [])
  const selected = words.filter(word => settings.source === 'units'
    ? units.has(`${word.level}:${word.lesson}`)
    : isFavorite(word))
  const key = word => JSON.stringify([word.c.trim(), word.p.trim(), word.en.trim()])
  return [...new Map(selected.map(word => [key(word), word])).values()]
}
