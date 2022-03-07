import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'

import { CommonForm } from '.'
import { CommonInput, CheckBoxInput } from '../Input'
import Button from '../Button'

import ToDoList from '../../models/ToDoList'
import Color from '../../models/Color'
import useDebounce from '../../utils/hooks/useDebounce'
import getApiPath from '../../utils/getApiPath'
import { DEFAULT_COLOR } from '../../utils/constants'

import styles from './Styles.module.css'

type ListAddingPropTypes = {
  toDoItems: Array<ToDoList>
  setToDoItems: (items: Array<ToDoList>) => void
  onAdd: () => void
}

const ListAdding: React.FC<ListAddingPropTypes> = ({ toDoItems, setToDoItems, onAdd }) => {
  const [colors, setColors] = useState<Array<Color>>([DEFAULT_COLOR])
  const [activeColor, setActiveColor] = useState<number>(1)
  const [textValue, setTextValue] = useState<string>('')
  const [inputValid, setInputValid] = useState<boolean>(true)
  const [isHotChecked, setIsHotChecked] = useState<boolean>(false)
  const [isAddingNotStarted, setIsAddingNotStarted] = useState<boolean>(true)

  const debouncedTextValue = useDebounce<string>(textValue, 500)

  useEffect(() => {
    axios.get(getApiPath('colors')).then(({ data }) => {
      setColors(data)
    })
  }, [])

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === '') {
      setInputValid(false)
      setTextValue('')
    } else {
      setInputValid(true)
      setTextValue(event.target.value)
    }
  }

  const handleIsHotChange = () => {
    setIsHotChecked(!isHotChecked)
  }

  //FIXME: Сделать проверку совпадения имени чтобы избежать повторений
  const addList = ({ name, colorId, isHot }: Pick<ToDoList, 'name' | 'colorId' | 'isHot'>) => {
    if (!(name.trim() === '')) {
      setIsAddingNotStarted(false)

      axios.post(getApiPath('lists'), { name, colorId, isHot }).then(({ data }) => {
        setActiveColor(1)
        setIsHotChecked(false)
        setTextValue('')
        setIsAddingNotStarted(true)

        onAdd()

        setToDoItems([...toDoItems, { ...data }])
      })
    } else {
      setInputValid(false)
    }
  }

  const inputTextPlaceholder = inputValid ? 'Название списка' : 'Введите корректое название'

  return (
    <CommonForm>
      <CommonInput
        placeholder={inputTextPlaceholder}
        value={textValue}
        onChange={handleTextChange}
        valid={inputValid}
      />

      <CheckBoxInput
        checked={isHotChecked}
        onChange={handleIsHotChange}
        placeholder='Пометить как важный'
      />

      <ul className={styles.ul}>
        {colors.map(({ id, name, hex }) => {
          const classNames = [styles.circle]
          activeColor === id && classNames.push(styles.active)

          return (
            <li
              className={classNames.join(' ')}
              key={id}
              title={name}
              style={{ backgroundColor: hex }}
              onClick={() => setActiveColor(id)}
            />
          )
        })}
      </ul>

      <Button
        fullWidth={true}
        textCenter={true}
        color='#08D11C'
        type='button'
        disabled={!isAddingNotStarted}
        onClick={() => {
          addList({
            name: debouncedTextValue,
            colorId: activeColor,
            isHot: isHotChecked,
          })
        }}>
        {isAddingNotStarted ? 'Добавить' : 'Добавление...'}
      </Button>
    </CommonForm>
  )
}

export default ListAdding
