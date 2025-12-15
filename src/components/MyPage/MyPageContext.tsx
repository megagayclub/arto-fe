// src/components/MyPage/MyPageContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ActiveSection = "favorites" | "cart" | "history" | "inquiry";

interface MyPageContextType {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const MyPageContext = createContext<MyPageContextType | undefined>(undefined);

export const MyPageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("favorites");

  return (
    <MyPageContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </MyPageContext.Provider>
  );
};

export const useMyPage = (): MyPageContextType => {
  const context = useContext(MyPageContext);
  if (!context) {
    throw new Error("useMyPage must be used within a MyPageProvider");
  }
  return context;
};
