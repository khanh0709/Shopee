import { omitBy, isUndefined } from 'lodash'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useQueryParams from '../../hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'
import productApi from '../../apis/product.apis'
import Pagination from '../../components/Pagination'
import { ProductListConfig, QueryConfig } from '../../types/product.type'
import categoryApi from '../../apis/category.apis'
export default function ProductList() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined //loc underfined
  )
  const { data: productsResponse } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData //giúp web ko bi giật, web giật vì khi chuyển trang component bị re-render, data bị underfined đến khi query gọi xong.
    //nếu them thuộc tính này thì sẽ giữ data cũ đến khi gọi xong query
    //tuy nhiên là data vãn sẽ bị underfinded lần đầu tiên tải trang hoặc user f5 nên vẫn phải handle
  })
  const { data: categoriesResponse } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter queryConfig={queryConfig} categories={categoriesResponse?.data.data || []} />
          </div>
          <div className='col-span-9'>
            <SortProductList
              queryConfig={queryConfig}
              pageSize={productsResponse?.data.data?.pagination.page_size || 0}
            />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {productsResponse &&
                productsResponse.data.data?.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
            {productsResponse && (
              <Pagination queryConfig={queryConfig} pageSize={productsResponse.data.data?.pagination.page_size || 0} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
