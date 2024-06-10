import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  className: string
  type: string
  placeholder: string
  register: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  errorMessage?: string
  autoComplete?: string
}
export default function Input({
  className,
  type,
  placeholder,
  register,
  name,
  rules,
  errorMessage,
  autoComplete
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-left'>{errorMessage}</div>
    </div>
  )
}
