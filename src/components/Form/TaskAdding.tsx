import React, { useState } from 'react'
import axios from 'axios'

import Common from './Common'
import { CommonInput } from '@components/Input'
import Button from '@components/Button'

import Task from '@models/Task'

import getApiPath from '@utils/getApiPath'

import styles from './Styles.module.css'

type TaskAddingPropTypes = {
  listId: number
  onSuccess: (task: Task) => void
  onDeny: () => void
}

const TaskAdding: React.FC<TaskAddingPropTypes> = ({ listId, onSuccess, onDeny }) => {
  const [text, setText] = useState<string>('')
  const [textValid, setTextValid] = useState<boolean>(true)

  const addTask = () => {
    if (text.trim() !== '') {
      axios
        .post(getApiPath('tasks'), {
          listId,
          text,
          completed: false,
        })
        .then(({ data }) => {
          onSuccess(data)
        })
    } else {
      setTextValid(false)
    }
  }

  return (
    <Common>
      <CommonInput
        placeholder={textValid ? 'Текст задачи' : 'Даёшь корректные названия!!!'}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
        valid={textValid}
      />

      <div className={styles.buttons}>
        <Button onClick={addTask} color='#08D11C' type='button' children='Добавить задачу' />
        <Button onClick={onDeny} color='#D10808' type='button' children='Отмена' />
      </div>
    </Common>
  )
}

export default TaskAdding
