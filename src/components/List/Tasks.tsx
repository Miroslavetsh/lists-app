import React, { useState } from 'react'

import { TaskCreatingForm } from '@components/Form'
import { WithIconInteractive } from '@components/Interactive'
import { TaskBoxInput } from '@components/Input'

import Task from '@models/Task'

import styles from './Styles.module.css'

type TaskPropTypes = {
  list: Array<Task>
}

const Tasks: React.FC<TaskPropTypes> = ({ list }) => {
  const [creatingTaskVisible, setCreatingTaskVisible] = useState<boolean>(false)

  const toggleCreatingTaskVisible = () => {
    setCreatingTaskVisible(!creatingTaskVisible)
  }

  return (
    <>
      <ul className={styles.list}>
        {list.map(({ id, text, completed }) => {
          return <TaskBoxInput text={text} completed={completed} key={id} />
        })}
      </ul>

      {creatingTaskVisible ? (
        <TaskCreatingForm onSuccess={() => {}} onDeny={toggleCreatingTaskVisible} />
      ) : (
        <WithIconInteractive
          onClick={toggleCreatingTaskVisible}
          className={styles.add}
          iconStroked={true}
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

export default Tasks
