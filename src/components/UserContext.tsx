import React, { createContext } from "react";
import { ContextAction, AppState } from "../App";

interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<ContextAction>;
}
export const UserContext = createContext<AppContextType | undefined>(undefined);