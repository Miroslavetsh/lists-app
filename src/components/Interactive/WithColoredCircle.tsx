import React from 'react'

import { CommonInteractive } from '.'
import { CommonPropTypes } from './Common'

import styles from './Styles.module.css'

export type WithColoredCirclePropTypes = CommonPropTypes & {
  color: string
}

const WithColoredCircle: React.FC<WithColoredCirclePropTypes> = (props) => {
  const { color, children } = props

  const classNames = [styles.item, styles.withCircle]

  return (
    <div className={classNames.join(' ')}>
      <div className={styles.circle} style={{ backgroundColor: color }} />

      <CommonInteractive children={children} />
    </div>
  )
}

export default WithColoredCircle
