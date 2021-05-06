import React, { useState } from "react";
export const SpacesContext = React.createContext();
const SpacesContextProvider = SpacesContext.Provider;

export function SpacesProvider({ children }) {
  return <SpacesContextProvider value={{}}>{children}</SpacesContextProvider>;
}
