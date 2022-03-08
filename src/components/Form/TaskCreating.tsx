import React, { useState } from 'react'

import Common from './Common'
import { CommonInput } from '../Input'
import Button from '../Button'

import styles from './Styles.module.css'

type CreateTaskPropTypes = {
  onSuccess: () => void
  onDeny: () => void
}

// FIXME: Сделать валидацию, точнее даже целый хук с валидацией
const CreateTask: React.FC<CreateTaskPropTypes> = ({ onSuccess, onDeny }) => {
  const [name, setName] = useState<string>('')

  return (
    <Common>
      <CommonInput
        placeholder='Текст задачи'
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        valid={true}
      />

      <div className={styles.buttons}>
        <Button onClick={onSuccess} color='#08D11C' type='button' children='Добавить задачу' />
        <Button onClick={onDeny} color='#D10808' type='button' children='Отмена' />
      </div>
    </Common>
  )
}

export default CreateTask
