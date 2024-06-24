import { InputHTMLAttributes, forwardRef } from 'react'
/*
nếu sử dụng schema như login, register để validate thì nó sẽ warn lúc submit và submit xong nếu gõ sai tiếp
còn ở input price này ta muốn nó ko nhận giá trị khác ngoài số và sẽ chỉ validate nếu như nhập số hoặc không nhập gì
thì sử dụng cách này
khi nào input có value là số hoặc '' thì mới gọi đến onChaange. mà trong onChange thì sẽ thực hiện validate của schema
*/
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    onChange,
    className,
    errorMessage,
    value,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm text-left',
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    //call change if the value is number or '' and has onChange func
    if ((/^\d+$/.test(value) || value === '') && onChange) onChange(event)
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber
// export default function InputNumber({
//   onChange,
//   className,
//   errorMessage,
//   classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
//   classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm text-left',
//   ...rest
// }: Props) {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target
//     //call change if the value is number or '' and has onChange func
//     if ((/^\d+$/.test(value) || value === '') && onChange) onChange(event)
//   }
//   return (
//     <div className={className}>
//       <input className={classNameInput} {...rest} onChange={handleChange} />
//       <div className={classNameError}>{errorMessage}</div>
//     </div>
//   )
// }
