import React from 'react'

import { CommonInteractive, CommonInteractivePropTypes } from '.'

import styles from './Styles.module.css'

export interface WithColoredCirclePropTypes extends CommonInteractivePropTypes {
  color: string
}

const WithColoredCircle: React.FC<WithColoredCirclePropTypes> = ({ color, children }) => {
  const classNames = [styles.flexed, styles.withCircle]

  return (
    <div className={classNames.join(' ')}>
      <div className={styles.circle} style={{ backgroundColor: color }} />

      <CommonInteractive children={children} />
    </div>
  )
}

export default WithColoredCircle
