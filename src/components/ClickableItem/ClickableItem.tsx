import React from 'react'

import styles from './Styles.module.css'

export type ClickableItemPropTypes = {
  text: string
  href?: string
}

const ClickableItem: React.FC<ClickableItemPropTypes> = (props) => {
  const { href, text } = props

  if (href) {
    return (
      <a className={styles.inner} href={href}>
        {text}
      </a>
    )
  } else {
    return <span className={styles.inner}>{text}</span>
  }
}

export default ClickableItem
