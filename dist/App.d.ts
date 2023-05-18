import React from "react";
import "./App.css";
import { User } from "./interfaces";
export interface AppState {
    auth: boolean;
    user: User;
}
export type ContextAction = {
    type: string;
    payload?: any;
};
export declare function App(): React.JSX.Element;
export default App;
