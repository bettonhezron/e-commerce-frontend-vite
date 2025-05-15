export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
  page: number;
  limit: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
} 