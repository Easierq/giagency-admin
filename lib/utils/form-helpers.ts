import { generateSlug } from "./slug";

/**
 * Auto-generate slug from project name
 */
export function autoGenerateSlug(
  name: string,
  existingSlugs: string[] = []
): string {
  const baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

/**
 * Format form data for API submission
 */
export function formatProjectData(data: any) {
  return {
    ...data,
    completionDate: data.completionDate || null,
    images: data.images || [],
    badge: data.badge || null,
    clientName: data.clientName || null,
  };
}

/**
 * Parse project data for form
 */
export function parseProjectForForm(project: any) {
  return {
    ...project,
    completionDate: project.completionDate
      ? new Date(project.completionDate).toISOString().split("T")[0]
      : "",
    images: project.images || [],
    techStack: project.techStack || [],
    features: project.features || [],
    designTools: project.designTools || [],
    platforms: project.platforms || [],
    softwareUsed: project.softwareUsed || [],
    colorPalette: project.colorPalette || [],
  };
}
