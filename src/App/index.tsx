import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AllMain, CommonMain } from '@components/Main'
import Sidebar from '@components/Sidebar'

import ToDoList from '@models/ToDoList'

const App: React.FC = () => {
  const [activeSidebarItemId, setActiveSidebarItemId] = useState<number>(0) // It's showing all lists
  const [toDoLists, setToDoLists] = useState<Array<ToDoList>>([])

  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className='page'>
            <Sidebar
              toDoLists={toDoLists}
              setToDoLists={setToDoLists}
              activeItemId={activeSidebarItemId}
              setActiveItemId={setActiveSidebarItemId}
            />
            <AllMain
              activeItemId={activeSidebarItemId}
              toDoLists={toDoLists}
              setToDoLists={setToDoLists}
            />
          </div>
        }
      />
      <Route
        path='/lists/:id'
        element={
          <div className='page'>
            <Sidebar
              toDoLists={toDoLists}
              setToDoLists={setToDoLists}
              activeItemId={activeSidebarItemId}
              setActiveItemId={setActiveSidebarItemId}
            />
            <CommonMain
              activeItemId={activeSidebarItemId}
              toDoLists={toDoLists}
              setToDoLists={setToDoLists}
            />
          </div>
        }
      />
    </Routes>
  )
}

export default App
