import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { WithIconInteractive } from '@components/Interactive'
import { RemovableListItem } from '@components/ListItem'
import { ListAddingForm } from '@components/Form'
import { CommonPopup } from '@components/Popup'

import { Color, ToDoList } from '@models/index'

import getApiPath from '@utils/getApiPath'
import compareStringLength from '@utils/compareStringLength'

import { DEFAULT_COLOR, MAXIMUM_SIDEBAR_ITEM_TEXT_LENGTH } from '@constants/'

import styles from './Styles.module.css'

export type SidebarPropTypes = {
  activeItemId: number
  setActiveItemId: (index: number) => void
  toDoLists: Array<ToDoList>
  setToDoLists: (item: Array<ToDoList>) => void
}

const Sidebar: React.FC<SidebarPropTypes> = ({
  activeItemId,
  setActiveItemId,
  toDoLists,
  setToDoLists,
}) => {
  const [availableColors, setAvailableColors] = useState<Array<Color>>([DEFAULT_COLOR])
  const [popupAddListVisible, setPopupAddListVisible] = useState<boolean>(false)

  useEffect(() => {
    axios.get(getApiPath('lists')).then(({ data }) => {
      setToDoLists(data)
    })

    axios.get(getApiPath('colors')).then(({ data }) => {
      setAvailableColors(data)
    })
  }, [])

  const showAddListPopup = () => {
    setPopupAddListVisible(true)
  }

  const hideAddListPopup = () => {
    setPopupAddListVisible(false)
  }

  const togglePopupVisibility = () => {
    if (popupAddListVisible) {
      hideAddListPopup()
    } else {
      showAddListPopup()
    }
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <a href='/'>
          <WithIconInteractive
            active={activeItemId === 0}
            onClick={() => {
              setActiveItemId(0)
            }}
            icon={
              <svg
                width='12'
                height='12'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z'
                  fill='black'
                />
              </svg>
            }>
            Все списки
          </WithIconInteractive>
        </a>
      </div>

      <ul className={styles.mid}>
        {toDoLists // Hottest lists get higher
          .sort((a, b) => Number(b.isHot) - Number(a.isHot))
          .map(({ id, name, isHot, colorId }) => {
            const comparedName = compareStringLength(name, MAXIMUM_SIDEBAR_ITEM_TEXT_LENGTH)
            const { hex } = availableColors.find(({ id }) => id === colorId) || DEFAULT_COLOR

            const onRemove = () => {
              axios.delete(getApiPath(`lists/${id}`)).then(() => {
                setToDoLists([...toDoLists.filter((item) => item.id !== id)])
              })
            }

            const ListItem = (
              <RemovableListItem
                title={name}
                color={hex}
                isHot={isHot}
                active={id === activeItemId}
                onClick={() => setActiveItemId(id)}
                onRemove={onRemove}
                children={isHot ? comparedName + '🔥' : comparedName}
              />
            )

            return <React.Fragment key={id}>{ListItem}</React.Fragment>
          })}
      </ul>

      <div>
        <WithIconInteractive
          onClick={togglePopupVisibility}
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
          Добавить список
        </WithIconInteractive>

        <CommonPopup visible={popupAddListVisible} onClose={hideAddListPopup} locked={false}>
          <ListAddingForm
            toDoLists={toDoLists}
            setToDoLists={setToDoLists}
            onAdd={hideAddListPopup}
          />
        </CommonPopup>
      </div>
    </div>
  )
}

export default Sidebar
