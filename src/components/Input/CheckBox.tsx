import React, { ChangeEvent } from 'react'

import styles from './Styles.module.css'

type CheckboxPropTypes = {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const CheckBox: React.FC<CheckboxPropTypes> = (props) => {
  const { checked, onChange, placeholder } = props

  const classNames = [styles.label]

  return (
    <label className={classNames.join('')}>
      <input type='checkbox' checked={checked} onChange={onChange} />

      <span>{checked ? placeholder + '🔥' : placeholder}</span>
    </label>
  )
}

export default CheckBox
