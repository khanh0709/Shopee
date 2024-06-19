import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { ResponseApi } from '../types/utils.type'
import { http } from '../utils/https'
const URL = 'products'
const productApi = {
  getProducts: (params: ProductListConfig) => http.get<ResponseApi<ProductList>>(URL, { params }),
  getProductDetail: (id: string) => http.get<ResponseApi<Product>>(`${URL}/${id}`)
}
export default productApi
