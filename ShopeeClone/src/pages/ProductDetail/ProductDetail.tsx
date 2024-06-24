import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.apis'
import { divide } from 'lodash'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, forrmatNumberToSocialStyle, rateSale } from '../../utils/utils'
import Input from '../../components/Input'

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
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow '>
                <img
                  src={product.image}
                  alt={product.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((img, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%]' key={img}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
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
                  {rateSale(product.price_before_discount, product.price)}
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
                    {/* <Input /> continue */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
