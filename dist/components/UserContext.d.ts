import React from "react";
import { ContextAction, AppState } from "../App";
interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<ContextAction>;
}
export declare const UserContext: React.Context<AppContextType | undefined>;
export {};
