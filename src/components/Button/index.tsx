import React from 'react'

import styles from './Styles.module.css'

type ButtonPropTypes = {
  color: string
  type: 'submit' | 'reset' | 'button'
  onClick: () => void
  children?: React.ReactNode
  fullWidth?: boolean
  textCenter?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonPropTypes> = (props) => {
  const { color, type, onClick, children, fullWidth, textCenter, disabled } = props

  const classNames = [styles.button]
  fullWidth && classNames.push(styles.fullWidth)
  textCenter && classNames.push(styles.textCenter)

  return (
    <button
      className={classNames.join(' ')}
      style={{ backgroundColor: color }}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  children: <></>,
  fullWidth: false,
  textCenter: false,
  disabled: false,
}

export default Button
