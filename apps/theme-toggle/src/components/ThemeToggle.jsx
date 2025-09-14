import React, {useContext} from 'react'
import { ThemeContext } from '../context/ThemeProvider';
import './ThemeToggle.css'

function ThemeToggle() {
 const {theme , toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="theme-bg" aria-hidden>
      <div className="theme-bg__sun" />
      <div className="theme-bg__moon" />
      {/* optional: clouds/stars could go here */}
    </div>
   <div className="toggleContainer">
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className="slider"></span>
    </label>

   </div>       
   </>
  )
}

export default ThemeToggle