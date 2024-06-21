import { createSearchParams, useNavigate } from 'react-router-dom'
import { sortBy, order as orderConstant } from '../../../constants/product'
import { ProductListConfig, QueryConfig } from '../../../types/product.type'
import path from '../../../constants/path'
import { omit } from 'lodash'

interface Props {
  pageSize: number
  queryConfig: QueryConfig
}
export default function SortProductList({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  const handleNavigate = (pageNumber: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: pageNumber.toString()
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
            className={`h-8 px-4 capitalize text-sm text-left outline-none ${isActiveSortBy(sortBy.price) ? 'hover:bg-orange/80 bg-orange text-white' : 'bg-white text-black hover:bg-slate-100'}`}
            value={sort_by === sortBy.price && order ? order : ''}
            onChange={(event) => {
              handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
            }}
          >
            <option
              value=''
              disabled
              className={`h-8 px-4 capitalize text-sm text-left outline-none bg-white text-black hover:bg-slate-100`}
            >
              Giá
            </option>
            <option
              value={orderConstant.asc}
              className={`h-8 px-4 capitalize text-sm text-left outline-none bg-white text-black hover:bg-slate-100`}
            >
              Giá: Thấp đến cao
            </option>
            <option
              value={orderConstant.desc}
              className={`h-8 px-4 capitalize text-sm text-left outline-none bg-white text-black hover:bg-slate-100`}
            >
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        {pageSize !== 0 && (
          <div className='flex items-center justify-between'>
            <div className=''>
              <span className='text-orange'>{page}</span>
              <span>/{pageSize}</span>
            </div>
            <div className='ml-4'>
              <button
                onClick={() => {
                  handleNavigate(page - 1)
                }}
                className={`px-3 h-8 rounded-tl-sm rounded-bl-sm shadow hover:bg-slate-100 ${page === 1 ? 'cursor-not-allowed  bg-white/60' : 'bg-white'}`}
              >
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
              <button
                onClick={() => {
                  handleNavigate(page + 1)
                }}
                className={`px-3 h-8 rounded-tl-sm rounded-bl-sm shadow hover:bg-slate-100 ${page === pageSize ? 'cursor-not-allowed  bg-white/60' : 'bg-white'}`}
              >
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
        )}
      </div>
    </div>
  )
}
