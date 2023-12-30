import React from 'react';
import { useStorageState } from './useStorageState';
import { User } from 'firebase/auth';

const AuthContext = React.createContext<{ 
  signIn: (user: User) => void; 
  signOut: () => void;
  session?: string | null
}>({
  signIn: () => null,
  signOut: () => null,
  session: null
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[_, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: User) => {
          // Perform sign-in logic here
          setSession(user.uid);
        },
        signOut: () => {
          setSession(null);
        },
        session
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
