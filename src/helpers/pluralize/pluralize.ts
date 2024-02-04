export function pluralize(word: string): string {
  if (word.endsWith('y')) {
    return word.substring(0, word.length - 1) + 'ies'
  } else if (/[s|ss|sh|ch|x|o]$/.test(word)) {
    return word + 'es'
  } else if (word.endsWith('f')) {
    return word.substring(0, word.length - 1) + 'ves'
  } else if (word.endsWith('fe')) {
    return word.substring(0, word.length - 2) + 'ves'
  } else {
    return word + 's'
  }
}
