import React, { createContext } from "react";
import { Action, AppState } from "../App";

interface AppContextType {
    state: AppState,
    dispatch: React.Dispatch<Action>;
}
export const UserContext = createContext<AppContextType | null>(null);