import React, { MouseEventHandler } from 'react'

import { CommonInteractive } from '.'
import { CommonPropTypes } from './Common'

import styles from './Styles.module.css'

type WithIconPropTypes = CommonPropTypes & {
  icon?: React.ReactNode
  className?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const WithIcon: React.FC<WithIconPropTypes> = (props) => {
  const { icon, className, active, onClick, children } = props

  const classNames = [styles.item, styles.withIcon]
  className && classNames.push(className)
  active && classNames.push(styles.active)

  return (
    <div onClick={onClick} className={classNames.join(' ')}>
      <p className={styles.icon}>{icon}</p>

      <CommonInteractive children={children} />
    </div>
  )
}

WithIcon.defaultProps = {
  className: '',
  active: false,
  onClick: () => {},
}

export default WithIcon
