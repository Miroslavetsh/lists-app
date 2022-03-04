import React from 'react'

import styles from './Styles.module.css'

export type ClickableItemPropTypes = {
  text: string
}

const ClickableItem: React.FC<ClickableItemPropTypes> = (props) => {
  const { text } = props

  return <span className={styles.inner}>{text}</span>
}

export default ClickableItem
