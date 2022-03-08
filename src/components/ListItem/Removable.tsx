import React, { useState } from 'react'

import CommonItem, { CommonPropTypes } from './Common'
import { ConfirmationPopup } from '@components/Popup'
import {
  CommonInteractivePropTypes,
  WithColoredCircleInteractivePropTypes,
} from '@components/Interactive'

import styles from './Styles.module.css'

type RemovablePropTypes<T extends CommonInteractivePropTypes> = CommonPropTypes<T> & {
  onRemove: () => void
  className?: string
}

function Removable<T extends CommonInteractivePropTypes>(props: RemovablePropTypes<T>) {
  const { onRemove, className, active, isHot, onClick, title, children } = props

  const [isConfirmationWindowVisible, setIsConfirmationWindowVisible] = useState<boolean>(false)

  const openConfirmationWindow = () => {
    setIsConfirmationWindowVisible(true)
  }

  const closeConfirmationWindow = () => {
    setIsConfirmationWindowVisible(false)
  }

  const classNames = [styles.outer]
  className && classNames.push(className)

  let Item = (
    <CommonItem<CommonInteractivePropTypes>
      active={active}
      isHot={isHot}
      onClick={onClick}
      title={title}
      children={children}
    />
  )

  if ('color' in props) {
    let color = props['color']

    Item = (
      <CommonItem<WithColoredCircleInteractivePropTypes>
        active={active}
        isHot={isHot}
        onClick={onClick}
        title={title}
        color={color}
        children={children}
      />
    )
  }

  return (
    <div className={classNames.join(' ')}>
      {Item}

      {active && (
        <>
          <p onClick={openConfirmationWindow}>
            <svg
              width='11'
              height='11'
              viewBox='0 0 11 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z'
                fill='black'
              />
            </svg>
          </p>

          <ConfirmationPopup
            visible={isConfirmationWindowVisible}
            onDeny={closeConfirmationWindow}
            onSuccess={() => {
              closeConfirmationWindow()
              typeof onRemove === 'function' && onRemove()
            }}
          />
        </>
      )}
    </div>
  )
}

Removable.defaultProps = {
  className: '',
}

export default Removable
