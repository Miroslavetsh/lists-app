import React from 'react'
import ClickableItem, { ClickableItemProps } from './ClickableItem'

import styles from './Styles.module.css'

export type ClickableItemWithColoredCircleProps = ClickableItemProps & {
  color: string
}

const ClickableItemWithColoredCircle: React.FC<ClickableItemWithColoredCircleProps> = (props) => {
  const { color, text, href } = props

  const classNames = [styles.item, styles.withCircle]
  return (
    <div className={classNames.join(' ')}>
      <div className={styles.circle} style={{ backgroundColor: color }} />

      <ClickableItem text={text} href={href} />
    </div>
  )
}

export default ClickableItemWithColoredCircle
