import { Link, createSearchParams } from 'react-router-dom'
import path from '../../../constants/path'
import Input from '../../../components/Input'
import Button from '../../../components/Button/Button'
import StartLine from '../../../components/StarLine'
import { QueryConfig } from '../../../types/product.type'
import { Category } from '../../../types/category.type'
import { omit } from 'lodash'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  return (
    <div className='py-4'>
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams(omit(queryConfig, ['category'])).toString()
        }}
        className={`flex items-center justify-start font-bold ${!category ? 'text-orange font-semibold' : ''}`}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-3 mr-3'>
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
        {categories.map((categoryItem, index) => {
          if (categoryItem._id === category) {
            return (
              <li className='py-2 flex justify-start relative' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className='text-orange font-semibold w-full flex items-center'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='size-2 fill-orange basis-2'>
                    <path
                      fillRule='evenodd'
                      d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <div className=''>{categoryItem.name}</div>
                </Link>
              </li>
            )
          }
          return (
            <li className='py-2 flex justify-start relative' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className='w-full flex items-center'
              >
                <span className='basis-2'></span>
                <div className=''>{categoryItem.name}</div>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center justify-start font-bold mt-4'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-3 mr-3'>
          <path
            fillRule='evenodd'
            d='M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z'
            clipRule='evenodd'
          />
        </svg>
        <div className='flex-grow-1'>Bộ lọc tìm kiếm</div>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div className='text-left'>Khoảng giá</div>
        <form action='' className='mt-2'>
          <div className='flex items-start justify-between'>
            <Input
              placeholder='đ TỪ'
              type='text'
              className='grow'
              name='from'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
            <div className='mx-2 mt-1 shrink-0'>-</div>
            <Input
              placeholder='đ ĐẾN'
              type='text'
              className='grow'
              name='to'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex items-center justify-center'>
            Áp Dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 my-4 h-[1px]'></div>
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm'>
            <StartLine star={5} />
          </Link>
          <Link to={path.home} className='flex items-center text-sm'>
            <StartLine star={4} emptyStar={1}>
              <span>Trở lên</span>
            </StartLine>
          </Link>
          <Link to={path.home} className='flex items-center text-sm'>
            <StartLine star={3} emptyStar={2}>
              <span>Trở lên</span>
            </StartLine>
          </Link>
          <Link to={path.home} className='flex items-center text-sm'>
            <StartLine star={2} emptyStar={3}>
              <span>Trở lên</span>
            </StartLine>
          </Link>
          <Link to={path.home} className='flex items-center text-sm'>
            <StartLine star={1} emptyStar={4}>
              <span>Trở lên</span>
            </StartLine>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4'>
        <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex items-center justify-center uppercase'>
          Xóa Tất Cả
        </Button>
      </div>
    </div>
  )
}
