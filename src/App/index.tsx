import React, { useState } from 'react'

import Main from '@components/Main'
import Sidebar from '@components/Sidebar'

const App: React.FC = () => {
  const [activeSidebarItemId, setActiveSidebarItemId] = useState<number>(0) // It's showing all lists

  return (
    <div className='page'>
      <Sidebar activeItemId={activeSidebarItemId} setActiveItemId={setActiveSidebarItemId} />
      <Main activeItemId={activeSidebarItemId} />
    </div>
  )
}

export default App
