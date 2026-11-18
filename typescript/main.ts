export interface UserDataType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImageUrl: string;
}

// Union types for dropdowns and fixed states
export type RentalType = 'Daily' | 'Weekly' | 'Monthly';
export type EquipmentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Unavailable';
export type EquipmentCondition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Used';

// Update these categories to match your dropdown options
export type EquipmentCategory =
    | 'Construction'
    | 'Electronics'
    | 'Photography'
    | 'Vehicles'
    | 'Agriculture'
    | 'Event'
    | 'Tools'
    | 'Other';

// Nested interface for Owner Information
export interface OwnerInfo {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
}

// Main Equipment interface
export interface EquipmentDataType {
    id?: string;
    equipmentName: string;
    description: string;
    category: EquipmentCategory | string;
    location: string;
    rentalPrice: number;
    rentalType: RentalType;
    availableQuantity: number;
    equipmentCondition: EquipmentCondition | string;
    brand: string;
    model: string;
    equipmentImage: string; // Stores the URL returned from imgbb
    rentalTermsAndConditions: string;
    status: EquipmentStatus; // Defaults to 'Pending' on creation
    ownerInformation: OwnerInfo;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
