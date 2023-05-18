export declare const searchObjectByEmailAndPassword: (email: string, password: string) => {
    photo: string;
    name: string;
    id: string;
    position: string;
    email: string;
    phone: string;
    startDate: string;
    jobDescription: string;
    state: string;
    password: string;
} | undefined;
export declare const searchBookingRoom: (roomId: string) => {
    roomType: string;
    roomNumber: string;
    id: string;
    description: string;
    price: number;
    discount: number;
    cancellation: string;
    amenities: string[];
    thumbnail: string;
    images: string[];
    status: string;
};
