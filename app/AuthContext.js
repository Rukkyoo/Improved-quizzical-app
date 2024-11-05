// AuthContext.js
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase"; // Import the already initialized auth instance
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({
    currentUser: null, 
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
/*       setUser(user);
      setLoading(false); */
      if (user) {
        setCurrentUser({
          email: user.email,
          username: user.displayName,
        });
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
