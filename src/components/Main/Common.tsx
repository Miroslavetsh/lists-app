import React, { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'

import { TaskList } from '@components/List'
import { SidebarPropTypes } from '@components/Sidebar'

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
  const [currentTasks, setCurrentTasks] = useState<Array<Task>>([])
  const [currentTitleColor, setCurrentTitleColor] = useState<string>('#000')
  const [currentListName, setCurrentListName] = useState<string>('Загружаемса...')
  const [currentListId, setCurrentListId] = useState<number>(0)
  const [isHeadingEditable, setIsHeadingEditable] = useState<boolean>(false)

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

  useEffect(() => {
    const compare: (list: ExpandedList) => boolean = ({ id }) => id === activeSidebarItemId

    if (expandedLists.filter(compare)[0]) {
      const { tasks, color, name, id } = expandedLists.filter(compare)[0]

      setCurrentTasks(tasks)
      setCurrentTitleColor(color.hex)
      setCurrentListName(name)
      setCurrentListId(id)
    }
  }, [activeSidebarItemId, expandedLists])

  const handleCurrentListNameChange = (e: SyntheticEvent) => {
    setCurrentListName((e.target as HTMLInputElement).value)
  }

  const handleChangeButtonClick = () => {
    if (isHeadingEditable) {
      setToDoLists([
        ...toDoLists.map((item) => {
          if (item.id === currentListId) {
            item.name = currentListName
          }

          return item
        }),
      ])

      axios
        .patch(getApiPath(`lists/${currentListId}`), {
          name: currentListName,
        })
        .catch(() => {
          //TODO: сделать уведомление о том, что не переименовалось
        })
    }

    setIsHeadingEditable(!isHeadingEditable)
  }

  const headingClassNames = [styles.heading]
  isHeadingEditable && headingClassNames.push(styles.editable)

  return (
    <main className={styles.main}>
      {
        <>
          <h2
            style={{
              backgroundColor: currentTitleColor,
            }}
            className={headingClassNames.join(' ')}>
            <ContentEditable
              className={styles.textInput}
              html={currentListName}
              disabled={!isHeadingEditable}
              onChange={handleCurrentListNameChange}
            />

            {/* TODO: лоадер на кнопку и типа крестика если не удалось запостить или невалидное значение */}
            <button type='button' className={styles.edit} onClick={handleChangeButtonClick}>
              {isHeadingEditable ? (
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
              ) : (
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9337 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.638 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825V3.36825Z'
                    fill='black'
                  />
                </svg>
              )}
            </button>
          </h2>

          {expandedLists.length && (
            <TaskList
              listId={currentListId}
              list={Array.isArray(currentTasks) ? currentTasks : []}
              setList={setCurrentTasks}
            />
          )}
        </>
      }
    </main>
  )
}

export default Main
