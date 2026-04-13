import { apiGet, apiPost, apiPut, apiDelete } from "./client";

/**
 * Fetch all portfolio projects
 */
export async function fetchPortfolioProjects(options?: {
  status?: string;
  featured?: boolean;
  category?: string;
  limit?: number;
  search?: string;
}) {
  const params: Record<string, string> = {};

  if (options?.status) params.status = options.status;
  if (options?.featured) params.featured = "true";
  if (options?.category) params.category = options.category;
  if (options?.limit) params.limit = options.limit.toString();
  if (options?.search) params.search = options.search;

  return apiGet("/portfolio", params);
}

/**
 * Fetch single portfolio project by slug
 */
export async function fetchPortfolioProject(slug: string) {
  return apiGet(`/portfolio/${slug}`);
}

/**
 * Create new portfolio project
 */
export async function createPortfolioProject(data: any) {
  return apiPost("/portfolio", data);
}

/**
 * Update portfolio project
 */
export async function updatePortfolioProject(slug: string, data: any) {
  return apiPut(`/portfolio/${slug}`, data);
}

/**
 * Delete portfolio project
 */
export async function deletePortfolioProject(slug: string) {
  return apiDelete(`/portfolio/${slug}`);
}

/**
 * Fetch featured portfolio projects for homepage
 */
export async function fetchFeaturedPortfolio() {
  return fetchPortfolioProjects({
    status: "PUBLISHED",
    featured: true,
    limit: 10,
  });
}

/**
 * Fetch portfolio projects by category
 */
export async function fetchPortfolioByCategory(categorySlug: string) {
  return fetchPortfolioProjects({
    status: "PUBLISHED",
    category: categorySlug,
  });
}
