import React from 'react'

import styles from './Styles.module.css'

export type CommonPropTypes = {
  children: React.ReactNode
}

const Common: React.FC<CommonPropTypes> = ({ children }) => {
  return <form className={styles.form}>{children}</form>
}

export default Common
