import React from 'react'

import { ClickableItem } from '.'
import { ClickableItemPropTypes } from './ClickableItem'

import styles from './Styles.module.css'

export type ClickableItemWithColoredCirclePropTypes = ClickableItemPropTypes & {
  color: string
}

const ClickableItemWithColoredCircle: React.FC<ClickableItemWithColoredCirclePropTypes> = (
  props,
) => {
  const { color, text } = props

  const classNames = [styles.item, styles.withCircle]

  return (
    <div className={classNames.join(' ')}>
      <div className={styles.circle} style={{ backgroundColor: color }} />

      <ClickableItem text={text} />
    </div>
  )
}

export default ClickableItemWithColoredCircle
