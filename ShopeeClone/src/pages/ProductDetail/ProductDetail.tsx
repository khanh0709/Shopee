import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.apis'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, forrmatNumberToSocialStyle, rateSale } from '../../utils/utils'
import InputNumber from '../../components/InputNumber'
import DOMPurify from 'dompurify'
import ProductSlider from './components/ProductSlider'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailResponse } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = productDetailResponse?.data.data
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <ProductSlider product={product} />
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='w-4 h-4 fill-orange'
                    noneActiveClassName='w-4 h-4 fill-gray-500'
                  />
                </div>
                <div className='mx-4 h-4 bg-gray-300 w-[1px]'></div>
                <div className='flex  items-center'>
                  <span>{forrmatNumberToSocialStyle(product.sold)}</span>
                  <div className='ml-1 text-gray-500'>Đã bán</div>
                </div>
                <div className='mx-4 h-4 bg-gray-300 w-[1px]'></div>
                <div className='flex  items-center'>
                  <span>{forrmatNumberToSocialStyle(product.sold)}</span>
                  <div className='ml-1 text-gray-500'>Đã bán</div>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-100 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>đ{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                  <InputNumber
                    defaultValue={1}
                    classNameInput='h-8 w-14 border-t border-b boder-gray-300 p-1 text-center outline-none'
                    classNameError='hidden'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange px-5 capitalize text-orange shadow-sm bg-orange/10 hover:bg-orange/5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 mr-3'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-4 flex h-12 items-center justify-center rounded-sm border border-orange px-5 capitalizeshadow-sm bg-orange text-white hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* description */}
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-40 p-4 text-lg capitalize text-slate 700'>mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose text-left'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
/*
nếu render html như kia thì web dễ bị hack do có thể truyền code js vào 
sử dụng dompurify để loại bỏ js
*/
