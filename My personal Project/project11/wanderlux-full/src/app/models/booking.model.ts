export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Booking {
  id: number;
  tourId: number;
  userId: string;
  bookingRef: string;
  travelDate: string;
  numTravelers: number;
  totalAmount: number;
  status: BookingStatus;
  specialRequest?: string;
  createdAt: string;
  tourTitle?: string;
  tourThumbnail?: string;
  travelerName?: string;
}

export interface CreateBookingDto {
  tourId: number;
  travelDate: string;
  numTravelers: number;
  specialRequest?: string;
}
