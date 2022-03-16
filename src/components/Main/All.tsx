import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { SidebarPropTypes } from '@components/Sidebar'
import { TaskBoxInput } from '@components/Input'

import ToDoList from '@models/ToDoList'
import Task from '@models/Task'
import Color from '@models/Color'
import getApiPath from '@utils/getApiPath'

import styles from './Styles.module.css'

type MainPropTypes = Pick<SidebarPropTypes, 'activeItemId' | 'toDoLists' | 'setToDoLists'>

type ExpandedList = ToDoList & { color: Color; tasks: Array<Task> }

// FIXME: сделать useReducer чтобы не хранить такую кучу состояний
const Main: React.FC<MainPropTypes> = ({
  activeItemId: activeSidebarItemId,
  toDoLists,
  setToDoLists,
}) => {
  const [expandedLists, setExpandedLists] = useState<Array<ExpandedList>>([])

  useEffect(() => {
    axios
      .get(getApiPath('lists'), {
        params: {
          _expand: 'color',
          _embed: 'tasks',
        },
      })
      .then(({ data }) => {
        setExpandedLists(data)
      })
  }, [activeSidebarItemId])

  return (
    <main className={styles.flex}>
      {expandedLists.map((item) => (
        <>
          {
            <div>
              <h2
                style={{
                  backgroundColor: item.color.hex,
                }}
                className={styles.heading}>
                {item.name}
                {item.isHot && '🔥'}
              </h2>

              {item.tasks.length ? (
                <ul className={styles.list}>
                  {item.tasks.map(({ id, text, completed }) => {
                    return <TaskBoxInput id={id} text={text} completed={completed} key={id} />
                  })}
                </ul>
              ) : (
                <div> Нет тасок :&#40; </div>
              )}
            </div>
          }
        </>
      ))}
    </main>
  )
}

export default Main
