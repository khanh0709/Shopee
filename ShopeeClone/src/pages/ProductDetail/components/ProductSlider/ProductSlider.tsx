import { useMemo, useState } from 'react'
import { Product } from '../../../../types/product.type'

interface Props {
  product?: Product
}
export default function ProductSlider({ product }: Props) {
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 4]) //[0, 5)
  const [showedIndexImage, setShowedIndexImage] = useState(0)

  const selectShowImage = (imageIndex: number) => {
    setShowedIndexImage(imageIndex)
  }
  const next = () => {
    if (product) {
      if (showedIndexImage < product.images.length - 1) setShowedIndexImage(showedIndexImage + 1)
      if (showedIndexImage >= currentIndexImages[1] && currentIndexImages[1] < product.images.length - 1) {
        setCurrentIndexImages([currentIndexImages[0] + 1, currentIndexImages[1] + 1])
      }
    }
  }
  const prev = () => {
    if (product) {
      if (showedIndexImage > 0) setShowedIndexImage(showedIndexImage - 1)
      if (showedIndexImage <= currentIndexImages[0] && currentIndexImages[0] > 0) {
        setCurrentIndexImages([currentIndexImages[0] - 1, currentIndexImages[1] - 1])
      }
    }
  }
  return (
    <>
      <div className='relative w-full pt-[100%] shadow '>
        {product?.images[showedIndexImage] && (
          <img
            src={product?.images[showedIndexImage]}
            alt={product?.name}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        )}
      </div>
      <div className='relative mt-4 grid grid-cols-5 gap-1'>
        <button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white' onClick={prev}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
        </button>
        {product?.images.map((img, index) => {
          if (index >= currentIndexImages[0] && index <= currentIndexImages[1]) {
            const isActive = img === product?.images[showedIndexImage]
            return (
              <div
                className='relative w-full pt-[100%] col-span-1 hover:cursor-pointer'
                key={img}
                onMouseEnter={() => {
                  selectShowImage(index)
                }}
              >
                <img
                  src={img}
                  alt={product?.name}
                  className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                />
                {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
              </div>
            )
          }
        })}
        <button
          className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
          onClick={next}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
    </>
  )
}
