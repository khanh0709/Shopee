import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { LoginSchema, loginSchema } from '../../utils/rule'
import Input from '../../components/Input'
import { login } from '../../apis/auth.apis'
import { isAxios422Error } from '../../utils/utils'
import { ResponseApi } from '../../types/utils.type'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button/Button'
import path from '../../constants/path'

//dinh nghia cac field trong form de goi y
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: LoginSchema) => login(body)
  })
  const onSubmit = handleSubmit(
    (data) => {
      const body = data
      loginMutation.mutate(body, {
        onSuccess: (response) => {
          setIsAuthenticated(true)
          setProfile(response.data.data?.user ?? null)
          navigate('/')
        },
        onError: (error) => {
          if (isAxios422Error<ResponseApi<LoginSchema>>(error)) {
            const formError = error.response?.data.data
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof LoginSchema, {
                  message: formError[key as keyof LoginSchema],
                  type: 'Server'
                })
              })
            }
          }
        }
      })
    },
    () => {}
  )
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
              />
              <Input
                className='mt-2'
                name='password'
                placeholder='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='flex items-center mt-8 justify-center'>
                <div className='text-slate-400'>Bạn chưa có tài khoản?</div>
                <Link className='text-red-400 ml-1' to={path.register}>
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
