import React from 'react'

import styles from './Styles.module.css'

type ButtonPropTypes = {
  color: string
  type: 'submit' | 'reset' | 'button'
  onClick: () => void
  children?: React.ReactNode
  fullWidth?: boolean
  textCenter?: boolean
}

const Button: React.FC<ButtonPropTypes> = (props) => {
  const { onClick, type, color, children, fullWidth, textCenter } = props

  const classNames = [styles.button]
  fullWidth && classNames.push(styles.fullWidth)
  textCenter && classNames.push(styles.textCenter)

  return (
    <button
      className={classNames.join(' ')}
      style={{ backgroundColor: color }}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  fullWidth: false,
  textCenter: false,
}

export default Button
