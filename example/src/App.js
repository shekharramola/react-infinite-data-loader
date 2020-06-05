import React from 'react'
import { useMyHook } from 'react-infinite-data-loader'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App