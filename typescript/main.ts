// ============================================================
// Central type definitions — Equipment Rental Platform
//
// All shared, reusable types and interfaces live in this file.
// Import them via a relative path to this file, e.g.:
//   import type { Equipment, UserType } from "../../../../typescript/main";
//
// Component-private types (React props, local UI state) stay in
// their original files when they are not reusable elsewhere.
// ============================================================

// ------------------------------------------------------------
// Shared union types (dropdowns & fixed states)
// ------------------------------------------------------------

// Union types for dropdowns and fixed states
export type RentalType = 'Daily' | 'Weekly' | 'Monthly';
export type EquipmentStatus = "Pending" | "Approved" | "Rejected";
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

// ------------------------------------------------------------
// Equipment
// ------------------------------------------------------------

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
  creatorEmail: string; // Email of the user who created the equipment listing
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
  rentalTermsAndConditions?: string;
  status: EquipmentStatus; // Defaults to 'Pending' on creation
  ownerInformation: OwnerInfo;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// Equipment Types
export type Equipment = {
  _id: string;
  id: string;
  creatorEmail?: string;
  equipmentName: string;
  description?: string;
  equipmentImage: string[] | string;
  category: string;
  rentalPrice: number;
  rentalType: "Daily" | "Weekly" | "Monthly";
  location: string;
  availableQuantity: number;
  equipmentCondition?: string;
  rentalTermsAndConditions?: string;
  brand?: string;
  model?: string;
  status?: EquipmentStatus;
  createdAt?: string;
  updatedAt?: string;
  ownerInformation?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
};

// Query parameters for server-side search / filter / sorting
// on the All Equipment page (moved from src/lib/action/equipment/getEquipment.ts)
export type EquipmentFilterParams = {
  search?: string;
  category?: string;
  rentalType?: "Daily" | "Weekly" | "Monthly";
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
  sort?: "price-asc" | "price-desc" | "newest";
  page?: number;
  limit?: number;
};

// Standard `{ data: Equipment[] }` response returned by the
// equipment list endpoints (public list, admin list, owner list)
export interface EquipmentListResponse {
  data: Equipment[];
}

// ------------------------------------------------------------
// Users, auth & admin
// ------------------------------------------------------------

// User Data Type
export type UserRole = "customer" | "admin" | "owner";

export interface UserType {
  _id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
}


export interface SignUpType {
  _id: string;
  name: string;
  email: string;
  profileImageUrl: string;
  phoneNumber?: string;
  address?: string;
  password: string;
  confirmPassword: string;
}

export interface UsersApiResponse {
  success: boolean;
  message: string;
  data: UserType[];
}

// ------------------------------------------------------------
// Profile
// ------------------------------------------------------------

// Request body for PATCH /users/profile
// (moved from src/lib/action/users/update-profile.ts)
export interface ProfileUpdateData {
  name: string;
  image: string;
  phoneNumber: string;
  address: string;
}

// ------------------------------------------------------------
// Payments (Stripe)
// (moved from src/lib/action/payment/stripePayment.ts)
// ------------------------------------------------------------

export interface CreatePaymentPayload {
  equipmentId: string;
  userEmail?: string;
  startDate: string;
  endDate: string;
  quantity: number;
}

export interface CreatePaymentResponse {
  checkoutUrl: string;
  bookingId: string;
}

export interface APIResponse {
  data: CreatePaymentResponse;
}

// Rental booking type
export type RentalBooking = {
  _id: string;
  equipmentName: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  totalPay: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  bookingStatus: "Pending" | "Confirmed" | "Cancelled";
};

export type FavoriteEquipment = {
  _id: string;
  equipmentId: string;
  userId: string;
  userEmail: string;
  equipmentName: string;
  category: string;
  equipmentImage: string | string[];
  createdAt: string;
};

// ------------------------------------------------------------
// Homepage (GET /home-data)
// ------------------------------------------------------------

export type HomeStats = {
  totalEquipment: number;
  totalOwners: number;
  totalCustomers: number;
  completedRentals: number;
};

export type HomeData = {
  featuredEquipment: Equipment[];
  recentEquipment: Equipment[];
  categories: string[];
  stats: HomeStats;
};

// A single customer review. Used for clearly-labelled demo
// content today; ready for a real reviews API later.
export type CustomerReview = {
  name: string;
  initials: string;
  rating: number;
  comment: string;
};



export type AdminRental = {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  userEmail: string;

  startDate: string;
  endDate: string;
  rentalDuration: number;
  rentalType: "Daily" | "Weekly" | "Monthly";
  quantity: number;
  totalPay: number;

  paymentStatus: "Pending" | "Paid" | "Failed";
  bookingStatus: "Pending" | "Confirmed" | "Cancelled" | "Completed";

  createdAt: string;

  customerInformation: {
    name: string;
    email: string;
    phone: string;
  };

  ownerInformation: {
    name: string;
    email: string;
    phone: string;
  };
};
