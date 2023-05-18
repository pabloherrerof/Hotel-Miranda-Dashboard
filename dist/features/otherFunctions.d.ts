import { Booking } from "../interfaces";
type data = Booking | Booking[];
export declare function delay(data: data, time?: number): Promise<unknown>;
export declare const offerChecker: (discount: number) => "OFFER" | "";
export declare const offerPriceCalc: (price: number, discount: number) => string;
export declare const dateConverter: (dateToConver: string) => {
    date: string;
    hour: string;
};
export declare const bookedStatusCalc: (checkIn: string, checkOut: string) => "CHECK IN" | "CHECK OUT" | "IN PROGRESS";
export declare const totalPriceCalc: (pricePerNight: number, checkIn: string, checkOut: string) => number;
export declare function getTodayString(): string;
export declare const jobDescriptionChooser: (position: string) => "Responsible for the hotel's daily management." | "Responsible for greeting guests and checking them in and out of the hotel." | "Responsible for preparing and delivering food and beverages to guest rooms." | undefined;
export declare const roomInfoChooser: (roomType: string) => {
    cancelattion: string;
    amenities: string[];
    thumbnail: string;
    images: string[];
};
export declare const maxCharString: (string: string, maxChar: number) => string;
export {};
