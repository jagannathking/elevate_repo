import React, { useContext } from 'react'
import { ThemeContext } from './Context1';


const App = () => {
  const {theme, setTheme} = useContext(ThemeContext);


  return (
    <div>
      <h1>Theme : {theme}</h1>

      <div>
        <button onClick={() => setTheme(prev => prev === 'dark'? "light" : "dark")}>Toggle Theme</button>
      </div>
    </div>
  )
}

export default App