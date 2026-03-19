export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  role: string;
  createdAt: string;
}

export interface LoginDto   { email: string; password: string; }
export interface RegisterDto { fullName: string; email: string; password: string; phoneNumber?: string; role: 'Traveler' | 'Agency'; }

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: string;
}
