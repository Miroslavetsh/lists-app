import React, { ChangeEvent } from 'react'

import styles from './Styles.module.css'

type CheckBoxPropTypes = {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const CheckBox: React.FC<CheckBoxPropTypes> = (props) => {
  const { checked, onChange, placeholder } = props

  return (
    <label className={styles.label}>
      <input type='checkbox' checked={checked} onChange={onChange} />

      <span>{placeholder}</span>
    </label>
  )
}

export default CheckBox
