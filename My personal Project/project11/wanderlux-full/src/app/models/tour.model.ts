export interface Tour {
  id: number;
  title: string;
  destination: string;
  country: string;
  durationDays: number;
  price: number;
  discountPrice?: number;
  thumbnailUrl: string;
  badgeLabel?: string;
  isFeatured: boolean;
  isActive: boolean;
  rating?: number;
  reviewCount?: number;
  category: string;
  agencyId: number;
  agencyName?: string;
  createdAt: string;
}

export interface TourFilter {
  category?: string;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface TourCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}
