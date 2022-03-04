import React from 'react'

import styles from './Styles.module.css'

type InputPropTypes = {
  placeholder: string
}

const Input: React.FC<InputPropTypes> = ({ placeholder }) => {
  return <input className={styles.input} placeholder={placeholder} />
}

export default Input
