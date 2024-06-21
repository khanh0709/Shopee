import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../types/product.type'
import { formatCurrency, forrmatNumberToSocialStyle } from '../../../utils/utils'
import ProductRating from '../../../components/ProductRating'
import path from '../../../constants/path'
interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-3 transition-transform overflow-hidden'>
        <div className='w-full relative pt-[100%]'>
          <img
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs text-left'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-xs'>
              <span>{forrmatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
