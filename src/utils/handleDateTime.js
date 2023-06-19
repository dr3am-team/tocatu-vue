import dayjs from 'dayjs'

/**
 *
 * @param {Date} value
 * @param {String} type Valores posibles: time, date
 * @returns
 */
export function handleDateTime(value, type) {
  const data = {
    date: dayjs(value).utc().local().format('YYYY-MM-DDTHH:mm')
  }
  return data[type]
}
