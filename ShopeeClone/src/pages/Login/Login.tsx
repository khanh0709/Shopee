import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, getRules, loginSchema } from '../../utils/rule'
import Input from '../../components/Input'

//dinh nghia cac field trong form de goi y
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  })
  const rules = getRules()
  //run if form is validated
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-20 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={onSubmit} action='' noValidate className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                name='email'
                placeholder='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
                rules={rules.email}
              />
              <Input
                className='mt-2'
                name='password'
                placeholder='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                rules={rules.password}
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center mt-8 justify-center'>
                <div className='text-slate-400'>Bạn chưa có tài khoản?</div>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
