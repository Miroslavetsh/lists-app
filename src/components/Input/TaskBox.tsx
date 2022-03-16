import React, { SyntheticEvent, useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import axios from 'axios'

import { CommonInteractivePropTypes } from '@components/Interactive'
import { CommonListItem, RemovableListItem } from '@components/ListItem'

import Task from '@models/Task'

import useDebounce from '@utils/hooks/useDebounce'
import getApiPath from '@utils/getApiPath'

import styles from './Styles.module.css'

type TaskBoxPropTypes = Pick<Task, 'id' | 'text' | 'completed'> & {
  onRemove?: (id: number) => void
}

// TODO: учесть невозможность пустого поля
const TaskBox: React.FC<TaskBoxPropTypes> = ({ id, text, completed, onRemove }) => {
  const [taskCompleted, setTaskCompleted] = useState<boolean>(completed)
  const [taskInputText, setTaskInputText] = useState<string>(text)
  const debouncedTaskInputText = useDebounce(taskInputText, 500)

  const toggleTackCompletedChecked = () => {
    axios.patch(getApiPath(`tasks/${id}`), { completed: !taskCompleted })
    setTaskCompleted(!taskCompleted)
  }

  const handleTaskInputTextChange = (e: SyntheticEvent) => {
    setTaskInputText((e.target as HTMLInputElement).value)
  }

  useEffect(() => {
    axios.patch(getApiPath(`tasks/${id}`), { text: debouncedTaskInputText })
  }, [debouncedTaskInputText, id])

  if (!onRemove) {
    return (
      <CommonListItem<CommonInteractivePropTypes>
        active={true}
        onClick={toggleTackCompletedChecked}
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
      </CommonListItem>
    )
  }

  const removeTask = () => {
    axios
      .delete(getApiPath(`tasks/${id}`))
      .then(() => {
        typeof onRemove === 'function' && onRemove(id)
      })
      .catch(() => {
        // TODO: Сделать уведомление о том, что не удалось удалить
      })
  }

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
