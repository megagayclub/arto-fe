// src/components/MyPage/MyPageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ActiveSection = 'favorites' | 'cart' | 'history' | 'inquiry';

interface MyPageContextType {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  // 여기에 주문, 찜 목록 등의 데이터 상태를 추가할 수 있습니다.
}

const MyPageContext = createContext<MyPageContextType | undefined>(undefined);

export const MyPageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // 마이 메뉴의 초기 활성 섹션을 설정 (예: 찜 목록)
    const [activeSection, setActiveSection] = useState<ActiveSection>('favorites');

    const contextValue: MyPageContextType = {
        activeSection,
        setActiveSection,
    };

    return (
        <MyPageContext.Provider value={contextValue}>
            {children}
        </MyPageContext.Provider>
    );
};

export const useMyPage = () => {
    const context = useContext(MyPageContext);
    if (!context) {
        throw new Error('useMyPage must be used within a MyPageProvider');
    }
    return context;
};