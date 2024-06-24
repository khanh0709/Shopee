import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5-160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5-160 ký tự'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    minLength: {
      value: 6,
      message: 'Password có ít nhất 6 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password là bắt buộc'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập confirm password chưa khớp'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_max: string; price_min: string } //trả về valueForm = watch()
  if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)
  return price_min !== '' || price_max != ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại Password là bắt buộc')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    // test: function (value) {
    //   const price_min = value
    //   const { price_max } = this.parent as { price_max: string; price_min: string } //trả về valueForm = watch()
    //   if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)
    //   return price_min !== '' || price_max != ''
    // }
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    // test: function (value) {
    //   const price_max = value
    //   const { price_min } = this.parent as { price_max: string; price_min: string } //trả về valueForm = watch()
    //   if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)
    //   return price_min !== '' || price_max != ''
    // }
    test: testPriceMinMax
  })
})
export const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>

export const priceSchema = schema.pick(['price_max', 'price_min'])
export type PriceSchema = yup.InferType<typeof priceSchema>

export type Schema = yup.InferType<typeof schema>
