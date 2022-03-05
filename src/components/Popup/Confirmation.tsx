import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import 'wicg-inert'
import Button from '../Button'

import Common, { CommonPropTypes } from './Common'

import styles from './Styles.module.css'

type ConfirmationPropTypes = Pick<CommonPropTypes, 'onClose' | 'visible'> & {
  onSuccess: () => void
  onDeny: () => void
}

const Confirmation: React.FC<ConfirmationPropTypes> = (props) => {
  const { onSuccess, onDeny, visible } = props

  return (
    <Common visible={visible} locked={true} className={styles.confirmation}>
      <h2 className={styles.heading}>
        Список будет удалён
        <span title='Другими словами, без возможности восстановления'>безвозвратно</span>
      </h2>

      <div className={styles.buttons}>
        <Button color='#D10808' type='button' onClick={onSuccess} children='Продолжить' />

        <Button color='#373737' type='button' onClick={onDeny} children='Отменить' />
      </div>
    </Common>
  )
}

export default Confirmation
