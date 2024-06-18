import { Link } from 'react-router-dom'
import path from '../../../constants/path'
export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-4 mr-3'>
          <path
            fillRule='evenodd'
            d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
            clipRule='evenodd'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        <li className='py-2 flex justify-start relative'>
          <Link to={path.home} className='text-orange font-semibold w-full flex items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='size-2 fill-orange basis-2'>
              <path
                fillRule='evenodd'
                d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                clipRule='evenodd'
              />
            </svg>
            <div className='flex-grow-1'>Thời trang nam</div>
          </Link>
        </li>
        <li className='py-2 flex justify-start relative'>
          <Link to={path.home} className=' w-full flex items-center'>
            <div className='fill-orange basis-2'></div>
            <div className='flex-grow-1'>Thời trang nam</div>
          </Link>
        </li>
      </ul>
      {/* <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-2 fill-orange'>
          <path
            fillRule='evenodd'
            d='M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z'
            clipRule='evenodd'
          />
        </svg>
      </Link> */}
    </div>
  )
}
