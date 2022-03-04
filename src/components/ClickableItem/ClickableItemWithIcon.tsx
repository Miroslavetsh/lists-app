import React, { MouseEventHandler } from 'react'

import { ClickableItem } from '.'
import { ClickableItemPropTypes } from './ClickableItem'

import styles from './Styles.module.css'

type ClickableItemWithIconProps = ClickableItemPropTypes & {
  children: React.ReactNode | JSX.Element
  className?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const ClickableItemWithIcon: React.FC<ClickableItemWithIconProps> = (props) => {
  const { children, text, className, active, onClick } = props

  const classNames = [styles.item, styles.withIcon]

  className && classNames.push(className)
  active && classNames.push(styles.active)

  return (
    <div onClick={onClick} className={classNames.join(' ')}>
      <p className={styles.icon}>{children}</p>

      <ClickableItem text={text} />
    </div>
  )
}

ClickableItemWithIcon.defaultProps = {
  active: false,
  onClick: () => {},
}

export default ClickableItemWithIcon
