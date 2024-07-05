import React, {createContext, ReactNode, useContext, useState} from 'react';

interface MyContextState {
    basename: string;
}

const MyContext = createContext<MyContextState | undefined>(undefined);
export const MyProvider = ({children}: { children: ReactNode }) => {
    const [state, setState] = useState<MyContextState>({basename: 'default'});

    return (
        <MyContext.Provider value={state}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
