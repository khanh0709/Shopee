import { Category } from '../types/category.type'
import { ResponseApi } from '../types/utils.type'
import { http } from '../utils/https'

const URL = 'categories'
const categoryApi = {
  getCategories() {
    return http.get<ResponseApi<Category[]>>(URL)
  }
}
export default categoryApi
