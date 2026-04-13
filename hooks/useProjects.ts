import { useState, useEffect } from "react";
import { fetchProjects, fetchProjectBySlug } from "@/lib/api/services";
import { ServiceCategory } from "@/types/api";

interface UseProjectsOptions {
  status?: string;
  featured?: boolean;
  popular?: boolean;
  limit?: number;
}

/**
 * Hook to fetch multiple projects
 */
export function useProjects(
  category: ServiceCategory,
  options?: UseProjectsOptions
) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProjects(category, options);

        if (response.success && response.data) {
          setData([response.data]);
        } else {
          setError(response.error || "Failed to load projects");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [category, JSON.stringify(options)]);

  return { data, loading, error };
}

/**
 * Hook to fetch a single project
 */
export function useProject(category: ServiceCategory, slug: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProjectBySlug(category, slug);

        if (response.success && response.data) {
          setData(response.data);
        } else {
          setError(response.error || "Failed to load project");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProject();
    }
  }, [category, slug]);

  return { data, loading, error };
}
