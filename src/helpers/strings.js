const parse = (string) => {
  // Validate if the strings exists
  if (!string) return null

  // Convert to lower case
  string = string.toLowerCase()

  // Remove accents
  const from = 'ãàáäâáèéëêìíïîõòóöôùúüûç'
  const to = 'aaaaaeeeeeiiiiooooouuuuc'
  for (let i = 0, l = from.length; i < l; i++) {
    string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  return string
}

const countOccurrences = (string, character) => {
  let countSlash = 0
  for (let i = 0; i < string.length; i++) {
    if (string[i] === character) {
      countSlash++
    }
  }
  return countSlash
}

const removeAccents = (string) => {
  const accents = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U'
  }
  return string.replace(/[áéíóúÁÉÍÓÚ]/g, char => accents[char])
}

module.exports = { parse, countOccurrences, removeAccents }
