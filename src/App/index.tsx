import React, { useState } from 'react'

import Main from '@components/Main'
import Sidebar from '@components/Sidebar'

import ToDoList from '@models/ToDoList'

const App: React.FC = () => {
  const [activeSidebarItemId, setActiveSidebarItemId] = useState<number>(0) // It's showing all lists
  const [toDoLists, setToDoLists] = useState<Array<ToDoList>>([])

  return (
    <div className='page'>
      <Sidebar
        toDoLists={toDoLists}
        setToDoLists={setToDoLists}
        activeItemId={activeSidebarItemId}
        setActiveItemId={setActiveSidebarItemId}
      />
      <Main activeItemId={activeSidebarItemId} toDoLists={toDoLists} setToDoLists={setToDoLists} />
    </div>
  )
}

export default App
