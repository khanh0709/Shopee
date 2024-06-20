import axios, { AxiosError, HttpStatusCode } from 'axios'
//type predicate, ep kieu
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function isAxios422Error<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 0
  }).format(currency)
}
export function forrmatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
