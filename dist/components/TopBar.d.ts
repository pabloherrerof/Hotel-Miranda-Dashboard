import { Dispatch, SetStateAction } from "react";
interface TopBarProps {
    open: boolean;
    page: string;
    showSideBar: Dispatch<SetStateAction<boolean>>;
}
export declare const TopBar: ({ open, page, showSideBar }: TopBarProps) => import("react").JSX.Element | null;
export {};
