import React, { useEffect } from 'react'
import cx from './cx'
import { CloseIcon } from './Icons'

/**
 * Lightweight centred dialog. Closes on backdrop click and Escape.
 * Renders nothing at all when `open` is false.
 */
const Modal = ({ open, onClose, title, description, children, footer, className = '' }) => {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5" role="dialog" aria-modal="true">
      <div onClick={onClose} className="absolute inset-0 bg-neutral-900/40" />

      <div
        className={cx(
          'relative w-full max-w-md overflow-hidden rounded border border-neutral-200 bg-white shadow-lg',
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-neutral-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <CloseIcon size={17} />
          </button>
        </div>

        {children && <div className="max-h-[65vh] overflow-y-auto px-5 py-4">{children}</div>}

        {footer && <div className="flex justify-end gap-2 border-t border-neutral-200 px-5 py-3">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
