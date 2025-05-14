import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  return (
    <div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};


