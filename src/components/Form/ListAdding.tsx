import React, { ChangeEvent, useState } from 'react'

import { CommonForm } from '.'
import { TextInput, CheckBoxInput } from '../Input'
import Button from '../Button'

import ListItemEntity from '../../models/ToDoList'
import ToDoList from '../../models/ToDoList'
import Color from '../../models/Color'
import useDebounce from '../../utils/hooks/useDebounce'

// FIXME: переписать на бэкенд и делать фетч запрос
import { colors, lists } from '../../assets/imdb.json'

import styles from './Styles.module.css'

const COLORS: Array<Color> = colors

type ListAddingPropTypes = {
  items: Array<ToDoList>
  setItems: (items: Array<ToDoList>) => void
  onAdd?: () => void
}

const ListAdding: React.FC<ListAddingPropTypes> = ({ items, setItems, onAdd }) => {
  const [activeColor, setActiveColor] = useState<number>(1)
  const [textValue, setTextValue] = useState<string>('')
  const [inputValid, setInputValid] = useState<boolean>(true)
  const [isHotChecked, setIsHotChecked] = useState<boolean>(false)

  const debouncedTextValue = useDebounce<string>(textValue, 500)

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

  // useEffect(() => {
  //   console.log(debouncedTextValue)
  // }, [debouncedTextValue])

  //TODO: Сделать проверку совпадения имени чтобы избежать повторений
  const addList = (item: ListItemEntity) => {
    if (item.name.trim() === '') {
    } else {
      setItems([...items, item])
      setActiveColor(1)
      setIsHotChecked(false)
      setTextValue('')

      typeof onAdd === 'function' && onAdd()
    }
  }

  const inputTextPlaceholder = inputValid ? 'Название списка' : 'Введите корректое название'

  return (
    <CommonForm>
      <TextInput
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
        {COLORS.map(({ id, name, hex }) => {
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
        onClick={() => {
          addList({
            id: lists[lists.length - 1].id + 1,
            name: debouncedTextValue,
            colorId: activeColor,
            isHot: isHotChecked,
          })
        }}>
        Добавить
      </Button>
    </CommonForm>
  )
}

ListAdding.defaultProps = {
  onAdd: () => {},
}

export default ListAdding
