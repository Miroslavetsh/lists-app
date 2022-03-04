import React, { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import Form from './Form'

import { colors } from '../../assets/imdb.json'
import Color from '../../models/Color'

import styles from './Styles.module.css'

const COLORS: Array<Color> = colors

const AddList: React.FC = () => {
  const [activeColor, setActiveColor] = useState<number>(1)

  return (
    <Form>
      <Input placeholder='Название списка' />

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
          /**
           * addNewListItem
           */
        }}>
        Добавить
      </Button>
    </Form>
  )
}

export default AddList
