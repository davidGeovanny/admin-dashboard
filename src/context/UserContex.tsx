import React, { createContext } from 'react';

interface ContextProps {
}

// const userInitState: {} = {
// };

export const UserContext = createContext( {} as ContextProps );

export const UserProvider: React.FC = ({ children }) => {

  return (
    <UserContext.Provider
      value={{
      }}
    >
      { children }
    </UserContext.Provider>
  );
}