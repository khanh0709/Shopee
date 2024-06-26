import { createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from '../../types/product.type'
import path from '../../constants/path'

interface Props {
  star?: number
  starLength?: number
  children?: React.ReactNode
  queryConfig: QueryConfig
}
export default function StartLine({ star = 0, starLength = 5, children, queryConfig }: Props) {
  const navigate = useNavigate()
  const handleFilterStar = (star: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: star.toString()
      }).toString()
    })
  }
  return (
    <div
      className='flex items-center text-sm hover:bg-gray-100 hover:cursor-pointer'
      onClick={() => {
        handleFilterStar(star)
      }}
    >
      {Array(star)
        .fill(0)
        .map((_, index) => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-4 h-4 mr-1 fill-yellow-500'
            key={index}
          >
            <path
              fillRule='evenodd'
              d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
              clipRule='evenodd'
            />
          </svg>
        ))}
      {Array(starLength - star)
        .fill(0)
        .map((_, index) => (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            // stroke='yellow'
            className='w-4 h-4 mr-1 stroke-yellow-500 fill-white'
            key={index}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
            />
          </svg>
        ))}
      {children}
    </div>
  )
}
