export interface Review {
  id: number;
  tourId: number;
  userId: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  userName?: string;
}

export interface CreateReviewDto { tourId: number; rating: number; comment: string; }
