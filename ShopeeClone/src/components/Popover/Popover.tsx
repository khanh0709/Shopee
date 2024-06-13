import { useRef, useState, ElementType } from 'react'
import { FloatingPortal, arrow, offset, shift, useFloating } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initOpen?: boolean
}
export default function Popover({ children, renderPopover, className, as: Element = 'div', initOpen = false }: Props) {
  const [open, setOpen] = useState(initOpen)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, strategy, middlewareData, floatingStyles } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })]
  })
  /*
  middlewareData là tọa độ của arrow so với floating
  */
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              // style={floatingStyles}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute z-10'
                style={{
                  left: middlewareData.arrow?.x,
                  // top: middlewareData.arrow?.y,
                  top: '-18px'
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
