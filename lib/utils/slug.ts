export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Generates a unique slug by appending a counter if needed
 * @param text - The text to convert to a slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(
  text: string,
  existingSlugs: string[] = []
): string {
  let slug = generateSlug(text);
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(text)}-${counter}`;
    counter++;
  }

  return slug;
}
