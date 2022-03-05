import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import 'wicg-inert'
import Button from '../Button'

import Popup, { PopupPropTypes } from './Popup'

import styles from './Styles.module.css'

type ConfirmationPopupPropTypes = Pick<PopupPropTypes, 'onClose' | 'visible'> & {
  onSuccess: () => void
  onDeny: () => void
}

const ConfirmationPopup: React.FC<ConfirmationPopupPropTypes> = (props) => {
  const { visible, onSuccess, onDeny } = props

  return (
    <Popup visible={visible} locked={true} className={styles.confirmation}>
      <h2 className={styles.heading}>
        Список будет удалён{' '}
        <span title='Другими словами, без возможности восстановления'>безвозвратно</span>
      </h2>

      <div className={styles.buttons}>
        <Button color='#D10808' type='button' onClick={onSuccess} children='Продолжить' />

        <Button color='#373737' type='button' onClick={onDeny} children='Отменить' />
      </div>
    </Popup>
  )
}

export default ConfirmationPopup
