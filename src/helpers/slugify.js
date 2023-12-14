function slugify (string) {
  // Validate if the string exists
  if (!string) return null

  // Cut the spaces at the beginning and at the end of the slug.
  string = string.trim()

  // Convert to lower case
  string = string.toLowerCase()

  // Remove accents, swap ñ for n, etc
  const from = 'ãàáäâáèéëêìíïîõòóöôùúüûñç'
  const to = 'aaaaaeeeeeiiiiooooouuuunc'
  for (let i = 0, l = from.length; i < l; i++) {
    string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  // Remove special characters
  string = string.replace(/[^a-z0-9 -]/g, '')

  // Replace whitespace with -
  string = string.replace(/\s+/g, '-')

  return string
}

module.exports = slugify
