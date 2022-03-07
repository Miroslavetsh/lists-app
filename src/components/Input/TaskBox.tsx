import React, { useState } from 'react'

import { TaskCreatingForm } from '../Form'
import { CommonInteractivePropTypes, WithIconInteractive } from '../Interactive'
import { RemovableListItem } from '../ListItem'

import Task from '../../models/Task'

import styles from './Styles.module.css'

type TaskBoxPropTypes = Pick<Task, 'text' | 'completed'>

const TaskBox: React.FC<TaskBoxPropTypes> = (props) => {
  const { text, completed } = props

  const [checked, setChecked] = useState<boolean>(completed)

  const toggleCHecked = () => {
    setChecked(!checked)
  }

  return (
    <RemovableListItem<CommonInteractivePropTypes>
      active={true}
      onClick={toggleCHecked}
      onRemove={() => {}}
      className={styles.outer}>
      <label className={styles.taskLabel}>
        <input type='checkbox' checked={checked} />

        <span>
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
          {text}
        </span>
      </label>
    </RemovableListItem>
  )
}

export default TaskBox
