import { ApiResponse } from "@/types/api";

const BASE_URL = "/api";

/**
 * Generic API request function
 */
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * GET request
 */
export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<ApiResponse<T>> {
  const queryString = params
    ? "?" + new URLSearchParams(params).toString()
    : "";

  return apiRequest<T>(`${endpoint}${queryString}`, {
    method: "GET",
  });
}

/**
 * POST request
 */
export async function apiPost<T>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT request
 */
export async function apiPut<T>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: "DELETE",
  });
}

/**
 * PATCH request
 */
export async function apiPatch<T>(
  endpoint: string,
  data: any
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
