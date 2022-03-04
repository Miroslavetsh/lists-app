import React, { useEffect, useState } from 'react'

import { ClickableItemWithIcon } from '../ClickableItem'
import { AddListForm } from '../Form'
import ListItem from '../ListItem'
import Popup from '../Popup'

import { MAXIMUM_SIDEBAR_ITEM_TEXT_LENGTH } from '../../utils/constants'
import ToDoList from '../../models/ToDoList'

// TODO: Переписать на фетч
import { lists, colors } from '../../assets/imdb.json'

import styles from './Styles.module.css'

const Sidebar: React.FC = () => {
  const [toDoItems, setToDoItems] = useState<Array<ToDoList>>(lists)
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0)
  const [popupAddListVisible, setPopupAddListVisible] = useState<boolean>(false)

  const showAddListPopup = () => {
    setPopupAddListVisible(true)
  }

  const hideAddListPopup = () => {
    setPopupAddListVisible(false)
  }

  const togglePopupVisible = () => {
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
          <ClickableItemWithIcon
            active={activeItemIndex === 0}
            onClick={() => {
              setActiveItemIndex(0)
            }}
            text='Все Списки'>
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
          </ClickableItemWithIcon>
        </a>
      </div>

      <ul className={styles.mid}>
        {toDoItems
          .sort((a, b) => Number(b.isHot) - Number(a.isHot))
          .map(({ id, name, isHot, colorId }, index) => {
            const { hex } = colors.filter(({ id }) => id === colorId)[0]
            const text =
              name.length > MAXIMUM_SIDEBAR_ITEM_TEXT_LENGTH
                ? name.slice(0, MAXIMUM_SIDEBAR_ITEM_TEXT_LENGTH - 3) + '...'
                : name

            const onRemove = () => {
              setActiveItemIndex(0)
              toDoItems.splice(index, 1)
              setToDoItems([...toDoItems])
            }

            const Item = (
              <ListItem
                onRemove={onRemove}
                onClick={() => setActiveItemIndex(index + 1)}
                active={index + 1 === activeItemIndex}
                color={hex}
                text={text}
                isHot={isHot}
                title={name}
              />
            )

            return <React.Fragment key={name}>{Item}</React.Fragment>
          })}
      </ul>

      <div id='add-list-popup-parent'>
        <ClickableItemWithIcon
          onClick={togglePopupVisible}
          className={styles.add}
          text='Добавить список'>
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
        </ClickableItemWithIcon>

        <Popup visible={popupAddListVisible} onClose={hideAddListPopup} locked={false}>
          <AddListForm items={toDoItems} setItems={setToDoItems} onAdd={hideAddListPopup} />
        </Popup>
      </div>
    </div>
  )
}

export default Sidebar
