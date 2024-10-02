import React, { createContext, useContext, useState, PropsWithChildren } from "react";
import { InsightSortType, ShowAll } from "../hooks/useInsights";

export type SettingsContextType = {
    sortType: InsightSortType;
    categoryFilter: string;
    setSortType(sortType: InsightSortType): void;
    setCategoryFilter(categoryFilter: string): void;
}

export const SettingsContext = createContext<SettingsContextType>({
    sortType: InsightSortType.DateListed,
    categoryFilter: "",
    setSortType: () => null,
    setCategoryFilter: () => null
});

export const useSettingsProvider = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [sortType, setSortType] = useState(InsightSortType.DateListed);
    const [categoryFilter, setCategoryFilter] = useState(ShowAll);
    const value = { sortType, categoryFilter, setSortType, setCategoryFilter };
    return (<SettingsContext.Provider value={value}>
        {children}
    </SettingsContext.Provider>);
};
