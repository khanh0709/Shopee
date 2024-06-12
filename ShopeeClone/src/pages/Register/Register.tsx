import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { Schema, schema } from '../../utils/rule'
import Input from '../../components/Input'
import { registerAccount } from '../../apis/auth.apis'
import { isAxios422Error } from '../../utils/utils'
import { ResponseApi } from '../../types/utils.type'

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit(
    (data) => {
      const body = omit(data, ['confirm_password'])
      registerAccountMutation.mutate(body, {
        onSuccess: (data) => {
          console.log(data)
        },
        onError: (error) => {
          console.log('error')
          if (isAxios422Error<ResponseApi<Omit<Schema, 'confirm_password'>>>(error)) {
            //config generic type cho data cua error
            console.log('axios422error')
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof Omit<Schema, 'confirm_password'>, {
                  message: formError[key as keyof Omit<Schema, 'confirm_password'>],
                  type: 'Server'
                })
              })
            }
            // if (formError?.email) {
            //   setError('email', {
            //     message: formError.email,
            //     type: 'Server'
            //   })
            // }
            // if (formError?.password) {
            //   setError('password', {
            //     message: formError.password,
            //     type: 'Server'
            //   })
            // }
          }
        }
      })
    },
    () => {
      //nếu vi phạm rules, schema của useForm thì sẽ ko submit mà vào đây
      // const password = getValues('password')
      // console.log(password)
    }
  )
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-20 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form noValidate onSubmit={onSubmit} action='' className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                name='email'
                placeholder='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-3'
                name='password'
                placeholder='Password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
              />
              <Input
                className='mt-3'
                name='confirm_password'
                placeholder='Confirm Password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
              />
              {/* <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm text-left'>{errors.email?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm text-left'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm password'
                  autoComplete='on'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm text-left'>
                  {errors.confirm_password?.message}
                </div>
              </div> */}
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
