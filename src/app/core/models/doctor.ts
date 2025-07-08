export interface Doctor {
    id?: string;
    nameAr?: string;
    nameEn?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    isActive?: boolean;
    requiredResetPassword?: boolean;
    imageUrl?: string;
    specialtyId?: number;
}
