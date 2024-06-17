import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'

//https://axios-http.com/docs/interceptors
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(
      (response) => {
        // console.log(response)
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data?.access_token || undefined
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
