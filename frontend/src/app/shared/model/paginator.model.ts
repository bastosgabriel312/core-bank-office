export interface PageRequest {
  page: number;
  size: number;
  sort?: string;
  direction?: 'asc' | 'desc' | '';
}

export interface PageResponse<T> {
  content: T[];          
  page: number;          
  size: number;          
  totalElements: number; 
  totalPages: number;     
}