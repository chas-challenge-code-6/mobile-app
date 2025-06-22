import { createContext, useContext, useState } from "react";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [notWatched, setNotWatched] = useState([]);
  const badgeNumber = notWatched[0] === "" ? 0 : notWatched.length;
  return (
    <NewsContext.Provider value={{ notWatched, setNotWatched, badgeNumber }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNotWatched = () => useContext(NewsContext);
