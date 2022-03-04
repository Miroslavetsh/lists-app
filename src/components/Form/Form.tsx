import React from 'react'

import styles from './Styles.module.css'

export type FormPropTypes = {
  children: React.ReactNode
}

const Form: React.FC<FormPropTypes> = ({ children }) => {
  return <form className={styles.form}>{children}</form>
}

export default Form
