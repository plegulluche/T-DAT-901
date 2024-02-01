import React, { useEffect, useState } from 'react'
export const Context = React.createContext()

export function UserContext({children}) {

  const updateUser = async (value) => {
    return localStorage.setItem("user", value)
  }

  const getUser = () => {
    return localStorage.getItem("user")
  }

  return (
    <Context.Provider value={{ getUser, updateUser }}>
      {children}
    </Context.Provider>
  )
}

export const useUserContext = () => (React.useContext(Context))