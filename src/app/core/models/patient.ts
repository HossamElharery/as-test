export interface Patient {
    id?: string;
    nameAr?: string;
    nameEn?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    isActive?: boolean;
    requiredResetPassword?: boolean;
    address?: any;
    imageUrl?: string;
    bloodType?: number;
    bodyAge?: number;
    dateOfBirth?: string;
    gender?: number;
    patientInsurences?: any[];
}
