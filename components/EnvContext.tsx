import React, { createContext, useContext } from 'react';

interface EnvContextType {
  kursEnabled: boolean;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export const useEnv = () => {
  const context = useContext(EnvContext);
  if (context === undefined) {
    throw new Error('useEnv must be used within an EnvProvider');
  }
  return context;
};

interface EnvProviderProps {
  children: React.ReactNode;
  kursEnabled: boolean;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ children, kursEnabled }) => {
  const value: EnvContextType = {
    kursEnabled,
  };

  return (
    <EnvContext.Provider value={value}>
      {children}
    </EnvContext.Provider>
  );
};
