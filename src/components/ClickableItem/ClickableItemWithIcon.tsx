import React, { MouseEventHandler } from 'react'
import ClickableItem, { ClickableItemPropTypes } from './ClickableItem'

import styles from './Styles.module.css'

type ClickableItemWithIconProps = ClickableItemPropTypes & {
  children: React.ReactNode | JSX.Element
  className?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const ClickableItemWithIcon: React.FC<ClickableItemWithIconProps> = (props) => {
  const { children, text, className, active, onClick } = props

  const itemStyles = [styles.item, styles.withIcon]

  className && itemStyles.push(className)
  active && itemStyles.push(styles.active)

  return (
    <div onClick={onClick} className={itemStyles.join(' ')}>
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
