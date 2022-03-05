import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react'

import styles from './Styles.module.css'

export type CommonPropTypes = {
  placeholder: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  valid: boolean
  type?: HTMLInputTypeAttribute
}

const Common: React.FC<CommonPropTypes> = (props) => {
  const { placeholder, value, onChange, valid, type } = props

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

Common.defaultProps = {
  type: 'text',
}

export default Common