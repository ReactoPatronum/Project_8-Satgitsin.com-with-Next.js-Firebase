import { createContext, useContext, useState } from "react";

const CategoryContext = createContext({});
export const useCategories = () => useContext(CategoryContext);

export const CategoriesContextProvider = ({ children }) => {
  const [car, setCar] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [checkReload, setCheckReload] = useState(true);
  const [hamburger,setHamburger]=useState(false)

  const contextValue = {
    checkReload,
    setCheckReload,
    car,
    electronics,
    setCar,
    setElectronics,
    setHamburger,
    hamburger
  };
  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
