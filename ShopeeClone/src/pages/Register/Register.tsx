import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-20 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  name='email'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm text-left'>Email không hợp lệ</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  name='password'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm text-left'>Mật khẩu không hợp lệ</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm password'
                  name='confirm_password'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm text-left'>Mật khẩu không hợp lệ</div>
              </div>
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center mt-8 justify-center'>
                <div className='text-slate-400'>Bạn đã có tài khoản?</div>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
