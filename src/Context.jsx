import { createContext, useState } from 'react'

export const AppContext = createContext()
const Context = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(4)
  return (
    <AppContext.Provider value={{ totalAmount, setTotalAmount }}>
      {children}
    </AppContext.Provider>
  )
}
export default Context
