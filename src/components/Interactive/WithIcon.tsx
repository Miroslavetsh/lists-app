import React, { MouseEventHandler } from 'react'

import { CommonInteractive } from '.'
import { CommonPropTypes } from './Common'

import styles from './Styles.module.css'

interface WithIconPropTypes extends CommonPropTypes {
  icon: React.ReactNode
  iconStroked?: boolean
  className?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const WithIcon: React.FC<WithIconPropTypes> = (props) => {
  const { icon, iconStroked, className, active, onClick, children } = props

  const classNames = [styles.flexed, styles.withIcon]
  className && classNames.push(className)
  active && classNames.push(styles.active)

  const iconClassNames = [styles.icon]
  iconStroked && iconClassNames.push(styles.stroked)

  return (
    <div onClick={onClick} className={classNames.join(' ')}>
      <p className={iconClassNames.join(' ')}>{icon}</p>

      <CommonInteractive children={children} />
    </div>
  )
}

WithIcon.defaultProps = {
  iconStroked: false,
  className: '',
  active: false,
  onClick: () => {},
}

export default WithIcon
