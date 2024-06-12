import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'

//https://axios-http.com/docs/interceptors
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(
      function (response) {
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
