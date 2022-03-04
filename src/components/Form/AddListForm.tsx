import React, { ChangeEvent, useState } from 'react'

import { Form } from '.'
import { TextInput, CheckBoxInput } from '../Input'
import Button from '../Button'

import ListItemEntity from '../../models/ToDoList'
import Color from '../../models/Color'
import useDebounce from '../../utils/hooks/useDebounce'

// FIXME: переписать на бэкенд и делать фетч запрос
import { colors, lists } from '../../assets/imdb.json'

import styles from './Styles.module.css'

const COLORS: Array<Color> = colors

const AddListForm: React.FC = () => {
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

  const addList = (obj: ListItemEntity) => {
    if (obj.name.trim() === '') {
    } else {
      console.log(obj)
    }
  }

  const inputTextPlaceholder = inputValid ? 'Название списка' : 'Введите корректое название'

  return (
    <Form>
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
    </Form>
  )
}

export default AddListForm
