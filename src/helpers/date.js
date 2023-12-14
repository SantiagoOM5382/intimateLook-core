const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const duration = require('dayjs/plugin/duration')
const isBetween = require('dayjs/plugin/isBetween')
const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc')
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)
const { http, responseCode } = require('./request')

const isDateInvalid = birthdate => {
  if (birthdate.length !== 10) {
    return http.response(null, responseCode.BAD_REQUEST, 'La fecha recibida del campo birthdate es inválida, debe seguir el formato YYYY-MM-DD')
  }

  if (Number(birthdate.split('-')[0]) > Number(dayjs().format('YYYY'))) {
    return http.response(null, responseCode.BAD_REQUEST, 'La fecha recibida del campo birthdate es inválida, no puedes venir del futuro')
  }

  if (Number(birthdate.split('-')[1]) > 12 || Number(birthdate.split('-')[1]) < 1) {
    return http.response(null, responseCode.BAD_REQUEST, 'La fecha recibida del campo birthdate es inválida, mes inválido')
  }

  if (Number(birthdate.split('-')[2]) > 31 || Number(birthdate.split('-')[2]) < 1) {
    return http.response(null, responseCode.BAD_REQUEST, 'La fecha recibida del campo birthdate es inválida, día inválido')
  }

  return null
}

const dayOfWeek = (dayIndex) => {
  return ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][dayIndex] || ''
}

const getCurrentDay = () => {
  const day = dayjs().tz('Etc/GMT+6').day()
  return day === 0 ? 7 : day
}

const getCurrentHour = () => {
  const date = dayjs().tz('Etc/GMT+6')
  return date.hour()
}

const getDateByDay = (day) => {
  const today = dayjs().tz('Etc/GMT+6')
  const parseDay = day === 7 ? 0 : day
  const daysUntilNext = (7 + parseDay - today.day()) % 7
  const nextDay = today.add(daysUntilNext, 'day')
  return nextDay.format('YYYY-MM-DD')
}

/**
 * Converts a day number to a string.
 *
 * @param {Number} dayIndex
 * @return {String} Returns day as string
 */
const dayOfWeekAsString = dayIndex => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex] || ''
}

module.exports = {
  isDateInvalid,
  dayOfWeekAsString,
  getCurrentDay,
  dayOfWeek,
  getCurrentHour,
  getDateByDay
}
