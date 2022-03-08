import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'

import { CommonInput, CheckBoxInput } from '@components/Input'
import Button from '@components/Button'
import { CommonForm } from '.'

import { ToDoList, Color } from '@models/index'

import getApiPath from '@utils/getApiPath'

import { DEFAULT_COLOR } from '@constants/'

import styles from './Styles.module.css'

type ListAddingPropTypes = {
  toDoLists: Array<ToDoList>
  setToDoLists: (items: Array<ToDoList>) => void
  onAdd: () => void
}

const ListAdding: React.FC<ListAddingPropTypes> = ({ toDoLists, setToDoLists, onAdd }) => {
  const [availableColors, setAvailableColors] = useState<Array<Color>>([DEFAULT_COLOR])

  // Input fields
  const [nameValue, setNameValue] = useState<string>('')
  const [nameValueValid, setNameValueValid] = useState<boolean>(true)
  const [activeColorId, setActiveColorId] = useState<number>(1)
  const [isHotChecked, setIsHotChecked] = useState<boolean>(false)

  const [isAddingInProcess, setIsAddingInProcess] = useState<boolean>(false)

  useEffect(() => {
    axios.get(getApiPath('colors')).then(({ data }) => {
      setAvailableColors(data)
    })
  }, [])

  const handleNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === '') {
      setNameValueValid(false)
      setNameValue('')
    } else {
      setNameValueValid(true)
      setNameValue(event.target.value)
    }
  }

  const handleIsHotInputChange = () => {
    setIsHotChecked(!isHotChecked)
  }

  //FIXME: Сделать проверку совпадения имени чтобы избежать повторений
  const addList = ({ name, colorId, isHot }: Pick<ToDoList, 'name' | 'colorId' | 'isHot'>) => {
    if (!(name.trim() === '')) {
      setIsAddingInProcess(true)

      axios.post(getApiPath('lists'), { name, colorId, isHot }).then(({ data: toDoList }) => {
        setNameValue('')
        setActiveColorId(1)
        setIsHotChecked(false)
        setIsAddingInProcess(false)

        onAdd()

        setToDoLists([...toDoLists, toDoList])
      })
    } else {
      setNameValueValid(false)
    }
  }

  const nameInputPlaceholder = nameValueValid ? 'Название списка' : 'Введите корректое название'

  return (
    <CommonForm>
      <CommonInput
        placeholder={nameInputPlaceholder}
        value={nameValue}
        valid={nameValueValid}
        onChange={handleNameInputChange}
      />

      <CheckBoxInput
        placeholder='Пометить как важный'
        checked={isHotChecked}
        onChange={handleIsHotInputChange}
      />

      <ul className={styles.ul}>
        {availableColors.map(({ id, name, hex }) => {
          const classNames = [styles.circle]
          activeColorId === id && classNames.push(styles.active)

          return (
            <li
              key={id}
              className={classNames.join(' ')}
              title={name}
              style={{ backgroundColor: hex }}
              onClick={() => setActiveColorId(id)}
            />
          )
        })}
      </ul>

      <Button
        type='button'
        color='#08D11C'
        disabled={isAddingInProcess}
        fullWidth={true}
        textCenter={true}
        onClick={() => {
          addList({
            name: nameValue,
            colorId: activeColorId,
            isHot: isHotChecked,
          })
        }}>
        {!isAddingInProcess ? 'Добавить' : 'Добавление...'}
      </Button>
    </CommonForm>
  )
}

export default ListAdding
