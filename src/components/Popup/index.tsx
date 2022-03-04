import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import 'wicg-inert'

import Portal from '../Portal'

import styles from './Styles.module.css'

type PopupPropTypes = {
  visible: boolean
  onClose: () => void
  locked: boolean
}

const Popup: React.FC<PopupPropTypes> = (props) => {
  const { visible, onClose, locked } = props

  const [active, setActive] = useState<boolean>(false)
  const backdrop = useRef<HTMLDivElement>(document.createElement('div'))

  useEffect(() => {
    const { current } = backdrop

    const transitionEnd = () => setActive(visible)

    const keyHandler: EventListener = (e) => {
      if (!locked && [27].indexOf((e as unknown as KeyboardEvent<HTMLDivElement>).which) >= 0) {
        onClose()
      }
    }

    const clickHandler: EventListener = (e) => {
      if (!locked && e.target === current) {
        onClose()
      }
    }

    if (current) {
      current.addEventListener('transitionend', transitionEnd)
      current.addEventListener('click', clickHandler)
      window.addEventListener('keyup', keyHandler)
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
        current.removeEventListener('click', clickHandler)
      }

      rootElement.removeAttribute('inert')
      window.removeEventListener('keyup', keyHandler)
    }
  }, [visible, locked, onClose])

  const classNames = [styles.backdrop]
  active && visible && classNames.push(styles.active)

  return (
    <>
      {(visible || active) && (
        <Portal className={styles.portal}>
          <div ref={backdrop} className={classNames.join(' ')}>
            <div className={styles.content}>{props.children}</div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default Popup
