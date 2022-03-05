import React, { MouseEventHandler } from 'react'

import { CommonInteractive } from '.'
import { CommonPropTypes } from './Common'

import styles from './Styles.module.css'

type WithIconPropTypes = CommonPropTypes & {
  children: React.ReactNode
  className?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const WithIcon: React.FC<WithIconPropTypes> = (props) => {
  const { children, className, active, onClick, text } = props

  const classNames = [styles.item, styles.withIcon]
  className && classNames.push(className)
  active && classNames.push(styles.active)

  return (
    <div onClick={onClick} className={classNames.join(' ')}>
      <p className={styles.icon}>{children}</p>

      <CommonInteractive text={text} />
    </div>
  )
}

WithIcon.defaultProps = {
  className: '',
  active: false,
  onClick: () => {},
}

export default WithIcon
