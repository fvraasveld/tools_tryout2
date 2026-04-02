import React, { createContext, useContext, ReactNode } from 'react';
import { User, ToolHistory } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isPremium: boolean;
  addToolToHistory: (toolId: string) => void;
  history: ToolHistory[];
}

const defaultUser: User = {
  isPremium: false,
  toolsUsed: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useLocalStorage<User>(STORAGE_KEYS.USER, defaultUser);
  const [history, setHistory] = useLocalStorage<ToolHistory[]>(STORAGE_KEYS.HISTORY, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const addToolToHistory = (toolId: string) => {
    // Add to used tools if not already there
    if (!user.toolsUsed.includes(toolId)) {
      setUserState({
        ...user,
        toolsUsed: [...user.toolsUsed, toolId],
      });
    }

    // Add to history
    const newHistoryItem: ToolHistory = {
      toolId,
      timestamp: new Date().toISOString(),
    };
    setHistory([newHistoryItem, ...history.slice(0, 49)]); // Keep last 50 items
  };

  const value: UserContextType = {
    user,
    setUser,
    isPremium: user.isPremium,
    addToolToHistory,
    history,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
