import { Dispatch, SetStateAction } from "react";
import { Booking, Contact } from "../interfaces";
interface ModalProps {
    mode?: string;
    page?: string;
    itemId?: string;
    setShowDeleteModal?: Dispatch<SetStateAction<boolean>>;
    setShowCreateModal?: Dispatch<SetStateAction<boolean>>;
    showDeleteModal?: boolean;
    showCreateModal?: boolean;
    showModal?: boolean;
    setShowModal?: Dispatch<SetStateAction<boolean>>;
    target?: Contact;
    showNotesModal?: boolean;
    setShowNotesModal?: Dispatch<SetStateAction<boolean>>;
    targetBooking?: Booking;
}
export declare const Modal: ({ page, itemId, setShowDeleteModal, setShowCreateModal, showDeleteModal, showCreateModal, mode, target, showModal, setShowModal, showNotesModal, setShowNotesModal, targetBooking }: ModalProps) => import("react").JSX.Element;
export {};
