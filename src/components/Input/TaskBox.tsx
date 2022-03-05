import React, { useState } from 'react'
import { TaskCreatingForm } from '../Form'
import { WithIconInteractive } from '../Interactive'
import { RemovableListItem } from '../ListItem'

import styles from './Styles.module.css'

const TaskBox: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [creatingTaskVisible, setCreatingTaskVisible] = useState<boolean>(false)

  const toggleCreatingTaskVisible = () => {
    setCreatingTaskVisible(!creatingTaskVisible)
  }

  const toggleCHecked = () => {
    setChecked(!checked)
  }

  return (
    <>
      <RemovableListItem
        active={true}
        onClick={toggleCHecked}
        color='#28456C'
        onRemove={() => {}}
        className={styles.outer}>
        <label className={styles.taskLabel}>
          <input type='checkbox' checked={checked} />

          <span>Текст</span>

          <svg
            width='11'
            height='8'
            viewBox='0 0 11 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001'
              stroke='white'
              stroke-width='1.5'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </label>
      </RemovableListItem>

      {creatingTaskVisible ? (
        <TaskCreatingForm onSuccess={() => {}} onDeny={toggleCreatingTaskVisible} />
      ) : (
        <WithIconInteractive
          onClick={toggleCreatingTaskVisible}
          className={styles.add}
          icon={
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8 1V15'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1 8H15'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          }>
          Добавить задачу
        </WithIconInteractive>
      )}
    </>
  )
}

export default TaskBox
