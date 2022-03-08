import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import 'wicg-inert'

import Portal from '@components/Portal'

import styles from './Styles.module.css'

export type CommonPropTypes = {
  visible: boolean
  locked: boolean
  onClose?: () => void
  className?: string
}

const Common: React.FC<CommonPropTypes> = (props) => {
  const { visible, locked, onClose, className } = props

  const [active, setActive] = useState<boolean>(false)
  const backdrop = useRef<HTMLDivElement>(document.createElement('div'))

  useEffect(() => {
    const { current } = backdrop

    const transitionEnd = () => setActive(visible)

    const closePopupOnEsc: EventListener = (e) => {
      if (!locked && [27].indexOf(((e as unknown) as KeyboardEvent<HTMLDivElement>).which) >= 0) {
        typeof onClose === 'function' && onClose()
      }
    }

    const handleClick: EventListener = (e) => {
      if (!locked && e.target === current) {
        typeof onClose === 'function' && onClose()
      }
    }

    if (current) {
      current.addEventListener('transitionend', transitionEnd)
      current.addEventListener('click', handleClick)
      window.addEventListener('keyup', closePopupOnEsc)
    }

    const activeElement = document.activeElement as HTMLElement
    const rootElement = document.querySelector('#root') as HTMLElement

    if (visible) {
      window.setTimeout(() => {
        activeElement.blur()

        setActive(visible)

        rootElement.setAttribute('inert', 'true')
      }, 10)
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', transitionEnd)
        current.removeEventListener('click', handleClick)
      }

      rootElement.removeAttribute('inert')
      window.removeEventListener('keyup', closePopupOnEsc)
    }
  }, [visible, locked, onClose])

  const classNames = [styles.backdrop]
  active && visible && classNames.push(styles.active)

  const contentClassNames = [styles.content]
  className && contentClassNames.push(className)

  return (
    <>
      {(visible || active) && (
        <Portal className={styles.portal}>
          <div ref={backdrop} className={classNames.join(' ')}>
            <div className={contentClassNames.join(' ')}>{props.children}</div>
          </div>
        </Portal>
      )}
    </>
  )
}

Common.defaultProps = {
  onClose: () => {},
  className: '',
}

export default Common
