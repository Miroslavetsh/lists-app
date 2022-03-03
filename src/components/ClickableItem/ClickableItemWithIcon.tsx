import React from 'react'
import ClickableItem, { ClickableItemProps } from './ClickableItem'

import styles from './Styles.module.css'

type ClickableItemWithIconProps = ClickableItemProps & {
  children: React.ReactNode | JSX.Element
  className?: string
}

const ClickableItemWithIcon: React.FC<ClickableItemWithIconProps> = (props) => {
  const { children, text, href, className } = props

  const itemStyles = [styles.item, styles.withIcon]
  className && itemStyles.push(className)

  return (
    <div className={itemStyles.join(' ')}>
      <p className={styles.icon}>{children}</p>

      <ClickableItem text={text} href={href} />
    </div>
  )
}

ClickableItemWithIcon.defaultProps = {
  href: '',
}

export default ClickableItemWithIcon
