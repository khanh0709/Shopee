import { createSearchParams, useNavigate } from 'react-router-dom'
import { sortBy } from '../../../constants/product'
import { ProductListConfig, QueryConfig } from '../../../types/product.type'
import path from '../../../constants/path'

interface Props {
  pageSize?: number
  queryConfig: QueryConfig
}
export default function SortProductList({ pageSize = 20, queryConfig }: Props) {
  const { sort_by = sortBy.view } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortByValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className=''>Sắp xếp theo</div>
          <button
            className={`h-8 px-4 capitalize ${isActiveSortBy(sortBy.view) ? 'bg-orange hover:bg-orange/80 text-white' : 'bg-white hover:bg-slate-100 text-black'}  text-sm text-center`}
            onClick={() => {
              handleSort(sortBy.view)
            }}
          >
            Phổ biến
          </button>
          <button
            className={`h-8 px-4 capitalize ${isActiveSortBy(sortBy.createAt) ? 'bg-orange hover:bg-orange/80 text-white' : 'bg-white hover:bg-slate-100 text-black'}  text-sm text-center`}
            onClick={() => {
              handleSort(sortBy.createAt)
            }}
          >
            Mới nhất
          </button>
          <button
            className={`h-8 px-4 capitalize ${isActiveSortBy(sortBy.sold) ? 'bg-orange hover:bg-orange/80 text-white' : 'bg-white hover:bg-slate-100 text-black'}  text-sm text-center`}
            onClick={() => {
              handleSort(sortBy.sold)
            }}
          >
            Bán chạy
          </button>
          <select
            name=''
            id=''
            className='h-8 px-4 capitalize bg-white text-black text-sm text-center hover:bg-slate-100 outline-none'
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center justify-between'>
          <div className=''>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-4'>
            <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
