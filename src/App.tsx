import { useState } from 'react'
import './App.css'
import { PassionDashboard } from './components/passion-dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PassionDashboard />
    </>
  )
}

export default App
