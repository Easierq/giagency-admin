import { apiGet, apiPost, apiPut, apiDelete } from "./client";
import { ServiceCategory } from "@/types/api";

/**
 * Fetch all projects for a service
 */
export async function fetchProjects(
  category: ServiceCategory,
  options?: {
    status?: string;
    featured?: boolean;
    popular?: boolean;
    limit?: number;
  }
) {
  const params: Record<string, string> = {};

  if (options?.status) params.status = options.status;
  if (options?.featured) params.featured = "true";
  if (options?.popular) params.popular = "true";
  if (options?.limit) params.limit = options.limit.toString();

  return apiGet(`/services/${category}`, params);
}

/**
 * Fetch single project by slug
 */
export async function fetchProjectBySlug(
  category: ServiceCategory,
  slug: string
) {
  return apiGet(`/services/${category}/${slug}`);
}

export async function fetchPortfolioBySlug(slug: string) {
  return apiGet(`/portfolio/${slug}`);
}

/**
 * Create new project
 */
export async function createProject(category: ServiceCategory, data: any) {
  return apiPost(`/services/${category}`, data);
}

/**
 * Update project
 */
export async function updateProject(
  category: ServiceCategory,
  slug: string,
  data: any
) {
  return apiPut(`/services/${category}/${slug}`, data);
}

/**
 * Delete project
 */
export async function deleteProject(category: ServiceCategory, slug: string) {
  return apiDelete(`/services/${category}/${slug}`);
}

/**
 * Fetch featured projects for homepage
 */
export async function fetchFeaturedProjects(category: ServiceCategory) {
  return fetchProjects(category, {
    status: "PUBLISHED",
    featured: true,
    limit: 5,
  });
}

/**
 * Fetch popular projects
 */
export async function fetchPopularProjects(category: ServiceCategory) {
  return fetchProjects(category, {
    status: "PUBLISHED",
    popular: true,
    limit: 10,
  });
}

/**
 * Fetch all published projects
 */
export async function fetchPublishedProjects(category: ServiceCategory) {
  return fetchProjects(category, {
    status: "PUBLISHED",
  });
}
