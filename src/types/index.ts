export interface User {
  id: number;
  email: string;
  pseudo: string;
  role: Role;
  updateAt: Date;
  createAt: Date;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  images: HotelImage[];
  updatedAt: Date;
  createdAt: Date;
}

export interface HotelImage {
  id: number;
  originalName: string;
  fileName: string;
  mimeType: string;
  path: string;
  size: number;
  hotelId: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface RegisterData {
  email: string;
  pseudo: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  email: string;
  pseudo: string;
}

export interface CreateOrUpdateHotelData {
  name: string;
  location: string;
  description: string;
}

export interface Stats {
  usersCount: number;
  hotelsCount: number;
  bookingsCount: number;
}