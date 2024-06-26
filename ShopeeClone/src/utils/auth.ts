import { User } from '../types/user.type'

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}
export const clearLS = () => {
  localStorage.removeItem('access_token')
}
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
