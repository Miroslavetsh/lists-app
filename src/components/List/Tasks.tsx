import React, { useState } from 'react'

import { TaskAddingForm } from '@components/Form'
import { WithIconInteractive } from '@components/Interactive'
import { TaskBoxInput } from '@components/Input'

import Task from '@models/Task'

import styles from './Styles.module.css'

type TaskPropTypes = {
  listId: number
  list: Array<Task>
  setList: (item: Array<Task>) => void
}

const Tasks: React.FC<TaskPropTypes> = ({ listId, list, setList }) => {
  const [taskAddingVisible, setTaskAddingVisible] = useState<boolean>(false)

  const toggleTaskAddingVisibility = () => {
    setTaskAddingVisible(!taskAddingVisible)
  }

  const onTaskAdding = (newTask: Task) => {
    toggleTaskAddingVisibility()
    setList([...list, newTask])
  }

  return (
    <>
      {list.length ? (
        <ul className={styles.list}>
          {list.map(({ id, text, completed }) => {
            return <TaskBoxInput text={text} completed={completed} key={id} />
          })}
        </ul>
      ) : (
        <div className={styles.emptyList}>Давайте добавим сюда первую таску 🐵</div>
      )}

      {taskAddingVisible ? (
        <TaskAddingForm
          listId={listId}
          onSuccess={onTaskAdding}
          onDeny={toggleTaskAddingVisibility}
        />
      ) : (
        <WithIconInteractive
          onClick={toggleTaskAddingVisibility}
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
