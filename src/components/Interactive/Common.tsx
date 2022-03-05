import React from 'react'

import styles from './Styles.module.css'

export type CommonPropTypes = {
  text: string
}

const Common: React.FC<CommonPropTypes> = (props) => {
  const { text } = props

  return <span className={styles.inner}>{text}</span>
}

export default Common
