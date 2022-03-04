import React, { ChangeEvent } from 'react'
import Input, { InputPropTypes } from './TextInput'

// import styles from './Styles.module.css'

type CheckboxPropTypes = {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const CheckBox: React.FC<CheckboxPropTypes> = (props) => {
  const { checked, onChange, placeholder } = props

  // TODO: Сделать красивый чекбокс и когда он нажат сделать красным шрифт
  // и огонёк после чтобы было понятно, что это такое
  return (
    <label>
      <input type='checkbox' checked={checked} onChange={onChange} />

      <span>{placeholder}</span>
    </label>
  )
}

export default CheckBox
