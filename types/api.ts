export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Service Categories
export type ServiceCategory =
  | "web-development"
  | "graphics-design"
  | "ai-automation"
  | "mobile-app-development"
  | "vibe-coding" // NEW
  | "ai-agent-building"; // NEW

// Project Status
export type ProjectStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
