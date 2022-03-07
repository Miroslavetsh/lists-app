import React, { MouseEventHandler } from 'react'

import {
  CommonInteractive,
  CommonInteractivePropTypes,
  WithColoredCircleInteractive,
} from '../Interactive'

import styles from './Styles.module.css'

export type CommonPropTypes<T extends CommonInteractivePropTypes> = T & {
  active?: boolean
  isHot?: boolean
  onClick?: MouseEventHandler<HTMLLIElement>
  title?: string
}

function Common<T extends CommonInteractivePropTypes>(props: CommonPropTypes<T>) {
  const { active, isHot, onClick, title, children } = props

  const classNames = [styles.li]
  active && classNames.push(styles.active)
  isHot && classNames.push(styles.hot)

  const conditionalChildren = isHot ? children + '🔥' : children

  let color = ''
  if ('color' in props && props['color']) {
    color = props['color']

    return (
      <li title={title} onClick={onClick} className={classNames.join(' ')}>
        <WithColoredCircleInteractive children={conditionalChildren} color={color} />
      </li>
    )
  }

  return (
    <li title={title} onClick={onClick} className={classNames.join(' ')}>
      <CommonInteractive children={conditionalChildren} />
    </li>
  )
}

export default Common
