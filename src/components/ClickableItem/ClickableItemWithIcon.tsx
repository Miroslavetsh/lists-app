import React, { MouseEventHandler } from 'react'
import ClickableItem, { ClickableItemProps } from './ClickableItem'

import styles from './Styles.module.css'

type ClickableItemWithIconProps = ClickableItemProps & {
  children: React.ReactNode | JSX.Element
  className?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

const ClickableItemWithIcon: React.FC<ClickableItemWithIconProps> = (props) => {
  const { children, text, href, className, active, onClick } = props

  const itemStyles = [styles.item, styles.withIcon]

  className && itemStyles.push(className)
  active && itemStyles.push(styles.active)

  return (
    <div className={itemStyles.join(' ')}>
      <p className={styles.icon}>{children}</p>

      <ClickableItem text={text} href={href} />
    </div>
  )
}

ClickableItemWithIcon.defaultProps = {
  href: '',
  active: false,
  onClick: () => {},
}

export default ClickableItemWithIcon
