import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { User } from '../types/user.type'

//https://axios-http.com/docs/interceptors
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS() //lưu accesstoken vào biến thì chỉ cần đọc 1 lần duy nhât còn nếu dùng ls thì đọc từ ls nhiều -> chậm
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        // console.log(response)
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data?.access_token || ''
          setAccessTokenToLS(this.accessToken)
          const profile: User | null = (response.data as AuthResponse).data?.user ?? null
          if (profile) setProfileToLS(profile)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        //có thể có những lỗi mà response ko có message.
        //Nên phải handle những lỗi đó bằng cách hiển thị message lỗi mặc định của axios
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          //nếu error.response bị undefind thì lệnh if trả false => thực hiện else nếu có
          const data: any | undefined = error.response?.data
          const message = data.message || error.message // handle error no message
          toast.error(message)
        }
        console.log(error)
        return Promise.reject(error)
      }
    )
  }
}
export const http = new Http().instance
