import React from 'react'

import Main from '@components/Main'
import Sidebar from '@components/Sidebar'

const App: React.FC = () => {
  return (
    <div className='page'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
