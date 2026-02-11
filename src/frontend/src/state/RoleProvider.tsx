import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type RoleType, ROLES } from './role';

interface RoleContextValue {
  currentRole: RoleType;
  setRole: (role: RoleType) => void;
  roleConfig: typeof ROLES[RoleType];
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<RoleType>(() => {
    const stored = localStorage.getItem('port-ops-role');
    return (stored as RoleType) || 'port-ops';
  });

  useEffect(() => {
    localStorage.setItem('port-ops-role', currentRole);
  }, [currentRole]);

  const value: RoleContextValue = {
    currentRole,
    setRole: setCurrentRole,
    roleConfig: ROLES[currentRole],
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}
