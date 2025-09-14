import { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedtheme = localStorage.getItem("theme");
    try {
      if (savedtheme == "dark" || savedtheme == "light") return savedtheme;
      return "light";
    } catch {
      return "light";
    }
  });

  theme

  useEffect(() => {
const root = document.documentElement;
 if(theme === 'dark')
    root.classList.add('dark');
else 
    root.classList.remove('dark');

    localStorage.setItem('theme',theme);

  },[theme])

  const toggleTheme = () => {
    setTheme((t) => t === 'dark' ? 'light' : 'dark')
  }

  return <ThemeContext.Provider value={{theme , toggleTheme }}>{children}</ThemeContext.Provider>;
}

export {ThemeContext}
