import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from '../../types/product.type'
import path from '../../constants/path'
/*Pagination nên để là Link chứ không phải button để có behavior khi hover(hiện link) và có thể open new tab */
interface Props {
  pageSize: number
  range?: number
  queryConfig: QueryConfig
}
export default function Pagination({ pageSize, range = 2, queryConfig }: Props) {
  const page = Number.parseInt(queryConfig.page || '1')
  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (
          pageNumber <= range ||
          pageNumber >= pageSize - range + 1 ||
          (pageNumber >= page - range && pageNumber <= page + range)
        ) {
          return (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: pageNumber.toString()
                }).toString()
              }}
              key={index}
              className={`${pageNumber === page ? 'bg-orange text-white' : 'bg-white'} rounded px-3 py-2 shadow-sm mx-2 cursor-pointer w-10`}
            >
              {pageNumber}
            </Link>
          )
        } else if (pageNumber === page - range - 1 || pageNumber === page + range + 1) {
          return (
            <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer w-10'>
              ...
            </span>
          )
        }
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white/40 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointor'
        >
          Prev
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-white/40 rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed'>Next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointor'
        >
          Next
        </Link>
      )}
    </div>
  )
}
