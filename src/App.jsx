import { useState } from 'react'
import './App.css'
import {Button} from "./components/ui/button";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>You stink Khaled!</h1>
      <Button/>
    </>
  )
}

export default App
