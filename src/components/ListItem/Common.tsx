import React, { MouseEventHandler } from 'react'

import { WithColoredCircleInteractivePropTypes } from '../Interactive'
import { WithColoredCircleInteractive } from '../Interactive'

import styles from './Styles.module.css'

export type CommonPropTypes = WithColoredCircleInteractivePropTypes & {
  active?: boolean
  isHot?: boolean
  onClick?: MouseEventHandler<HTMLLIElement>
  title?: string
}

const Common: React.FC<CommonPropTypes> = (props) => {
  const { active, isHot, onClick, title, children, color } = props

  const classNames = [styles.li]
  active && classNames.push(styles.active)
  isHot && classNames.push(styles.hot)

  return (
    <li title={title} onClick={onClick} className={classNames.join(' ')}>
      <WithColoredCircleInteractive children={isHot ? children + '🔥' : children} color={color} />
    </li>
  )
}

export default Common
