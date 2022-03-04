import React, { ChangeEvent, HTMLInputTypeAttribute, SyntheticEvent } from 'react'

import styles from './Styles.module.css'

export type InputPropTypes = {
  placeholder: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  valid: boolean
  type?: HTMLInputTypeAttribute
}

const Input: React.FC<InputPropTypes> = (props) => {
  const { placeholder, value, onChange, type, valid } = props

  const classNames = [styles.input]
  !valid && classNames.push(styles.notValid)

  return (
    <input
      type={type}
      value={value}
      className={classNames.join(' ')}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

Input.defaultProps = {
  type: 'text',
}

export default Input
