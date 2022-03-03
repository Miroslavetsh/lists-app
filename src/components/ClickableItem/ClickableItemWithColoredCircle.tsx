import React from 'react'
import ClickableItem, { ClickableItemProps } from './ClickableItem'

import styles from './Styles.module.css'

type ClickableItemWithColoredCircleProps = ClickableItemProps & {
  color: string
}

const ClickableItemWithColoredCircle: React.FC<ClickableItemWithColoredCircleProps> = (props) => {
  const { color, text, href } = props

  return (
    <div className={styles.item} >
      <div className={styles.circle} style={{ backgroundColor: color }}></div>
      <ClickableItem text={text} href={href} />
    </div>
  )
}

export default ClickableItemWithColoredCircle
