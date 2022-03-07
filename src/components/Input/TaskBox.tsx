import React, { ChangeEvent, SyntheticEvent, useState } from 'react'

import { CommonInteractivePropTypes, WithIconInteractive } from '../Interactive'
import { RemovableListItem } from '../ListItem'

import ContentEditable from 'react-contenteditable'

import Task from '../../models/Task'

import styles from './Styles.module.css'

type TaskBoxPropTypes = Pick<Task, 'text' | 'completed'>

//TODO: Добавить debounce для того, чтобы сохранять значение таски

const TaskBox: React.FC<TaskBoxPropTypes> = (props) => {
  const { text, completed } = props

  const [checked, setChecked] = useState<boolean>(completed)
  const [inputText, setInputText] = useState<string>(text)

  const toggleChecked = () => {
    setChecked(!checked)
  }

  const handleInputTextChange = (e: SyntheticEvent) => {
    console.log(e.target);
    
    setInputText((e.target as HTMLInputElement).value)
  }

  console.log(text);
  

  return (
    <RemovableListItem<CommonInteractivePropTypes>
      active={true}
      onClick={toggleChecked}
      onRemove={() => {}}
      className={styles.outer}>
      <label className={styles.taskLabel}>
        <input type='checkbox' checked={checked} onChange={() => {}} />

        <div className={styles.divWithIcon}>
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

          <ContentEditable className={styles.textInput} html={inputText} disabled={false} onChange={handleInputTextChange} />
        </div>
      </label>
    </RemovableListItem>
  )
}

export default TaskBox
