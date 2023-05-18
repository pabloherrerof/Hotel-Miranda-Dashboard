/// <reference types="react" />
import ReactDropdown, { Option } from "react-dropdown";
import { LinkProps } from "react-router-dom";
interface TableProps {
    big?: boolean;
    discount?: number;
    price?: boolean;
    offer?: boolean;
    active?: string;
    room?: boolean;
    user?: boolean;
}
interface ReactDropdownProps {
    options: any;
    baseClassName?: string;
    className?: string;
    controlClassName?: string;
    placeholderClassName?: string;
    menuClassName?: string;
    arrowClassName?: string;
    disabled?: boolean;
    arrowClosed?: React.ReactNode;
    arrowOpen?: React.ReactNode;
    onChange?: (arg: Option) => void;
    onFocus?: (arg: boolean) => void;
    value?: Option | string;
    placeholder?: String;
    room?: boolean;
}
export declare const TableActions: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const LeftActions: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const RightActions: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const TableContainer: import("styled-components").StyledComponent<"table", any, {}, never>;
export declare const TableTitle: import("styled-components").StyledComponent<"tr", any, {}, never>;
export declare const TableRow: import("styled-components").StyledComponent<"tr", any, {}, never>;
export declare const TableItem: import("styled-components").StyledComponent<"td", any, TableProps, never>;
export declare const ImageItem: import("styled-components").StyledComponent<"div", any, TableProps, never>;
export declare const UserTableImage: import("styled-components").StyledComponent<"img", any, {}, never>;
export declare const StyledLink: import("styled-components").StyledComponent<import("react").ForwardRefExoticComponent<LinkProps & import("react").RefAttributes<HTMLAnchorElement>>, any, {}, never>;
export declare const RoomImageItem: import("styled-components").StyledComponent<"img", any, {}, never>;
export declare const TableLink: import("styled-components").StyledComponent<"button", any, TableProps, never>;
export declare const SearchBar: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const CustomDropdown: import("styled-components").StyledComponent<typeof ReactDropdown, any, ReactDropdownProps, never>;
export {};
