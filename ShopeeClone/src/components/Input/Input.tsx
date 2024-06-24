import { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
export default function Input({
  className,
  register,
  name,
  rules,
  errorMessage,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm text-left',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
