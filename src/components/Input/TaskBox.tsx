import React, { SyntheticEvent, useState } from 'react'
import ContentEditable from 'react-contenteditable'

import { CommonInteractivePropTypes } from '@components/Interactive'
import { RemovableListItem } from '@components/ListItem'

import Task from '@models/Task'

import styles from './Styles.module.css'

type TaskBoxPropTypes = Pick<Task, 'text' | 'completed'>

// TODO: Добавить debounce для того, чтобы сохранять значение таски
// учесть issue с стейтом, мб заменить на useRef
// И учесть невозможность пустого поля
const TaskBox: React.FC<TaskBoxPropTypes> = ({ text, completed }) => {
  const [taskCompleted, setTaskCompleted] = useState<boolean>(completed)
  const [taskInputText, setTaskInputText] = useState<string>(text)

  const toggleTackCompletedChecked = () => {
    setTaskCompleted(!taskCompleted)
  }

  const handleTaskInputTextChange = (e: SyntheticEvent) => {
    setTaskInputText((e.target as HTMLInputElement).value)
  }

  const removeTask = () => {}

  return (
    <RemovableListItem<CommonInteractivePropTypes>
      active={true}
      onClick={toggleTackCompletedChecked}
      onRemove={removeTask}
      className={styles.outer}>
      <label className={styles.taskLabel}>
        <input type='checkbox' checked={taskCompleted} readOnly />

        <div className={styles.divWithIcon}>
          <svg
            width='11'
            height='8'
            viewBox='0 0 11 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <ContentEditable
            className={styles.textInput}
            html={taskInputText}
            disabled={false}
            onChange={handleTaskInputTextChange}
          />
        </div>
      </label>
    </RemovableListItem>
  )
}

export default TaskBox
