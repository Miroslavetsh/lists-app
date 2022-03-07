import React from 'react'

import styles from './Styles.module.css'

export interface CommonPropTypes {
  children: React.ReactNode | string
}

const Common: React.FC<CommonPropTypes> = (props) => {
  const { children } = props

  const classNames = [styles.inner, styles.item]

  return <span className={classNames.join(' ')}>{children}</span>
}

export default Common
