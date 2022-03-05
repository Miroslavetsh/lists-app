import React from 'react'

import styles from './Styles.module.css'

export type CommonPropTypes = {
  children: React.ReactNode | string
}

const Common: React.FC<CommonPropTypes> = (props) => {
  const { children } = props

  return <span className={styles.inner}>{children}</span>
}

export default Common
