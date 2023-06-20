import dayjs from 'dayjs'

/**
 *
 * @param {Date} value
 * @param {String} type Valores posibles: time, date, normalizedDate
 * @returns
 */
export function handleDateTime(value, type) {
  const data = {
    date: dayjs(value).utc().local().format('YYYY-MM-DDTHH:mm'),
    onlyDate: dayjs(value).utc().local().format('YYYY-MM-DD'),
    normalizedDate: dayjs(value).utc().local().format('DD-MM-YYYY')
  }
  return data[type]
}
