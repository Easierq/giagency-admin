import { z } from "zod";

// Common fields shared across all project types
const baseProjectSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug must be less than 200 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  name: z
    .string()
    .min(1, "Project name is required")
    .max(200, "Name must be less than 200 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters"),
  image: z.string().url("Must be a valid URL"),
  images: z.array(z.string().url()).optional(),
  // badge: z.string().optional(),
  badge: z.preprocess((val) => val ?? "", z.string().max(50)).optional(),
  popular: z.boolean().default(false),
  featured: z.boolean().default(false),
  // clientName: z.string().optional(),
  clientName: z.preprocess((val) => val ?? "", z.string().max(50)).optional(),
  completionDate: z.string().optional(), // ISO date string
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

// Web Development Project Schema
export const webDevelopmentProjectSchema = baseProjectSchema.extend({
  projectUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  githubUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  techStack: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .max(20, "Maximum 20 technologies allowed"),
  features: z
    .array(z.string())
    .min(1, "At least one feature is required")
    .max(30, "Maximum 30 features allowed"),
});

export type WebDevelopmentProjectFormData = z.infer<
  typeof webDevelopmentProjectSchema
>;

// Graphic Design Project Schema
export const graphicDesignProjectSchema = baseProjectSchema.extend({
  designTools: z
    .array(z.string())
    .min(1, "At least one design tool is required")
    .max(15, "Maximum 15 tools allowed"),
  projectType: z
    .string()
    .min(1, "Project type is required")
    .max(100, "Project type must be less than 100 characters"),
  colorPalette: z
    .array(z.string())
    .min(1, "At least one color palette is required")
    .max(15, "Maximum 15 tools allowed"),
  // colorPalette: z
  //   .array(
  //     z
  //       .string()
  //       .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color")
  //   )
  //   .max(10, "Maximum 10 colors allowed")
  //   .optional(),
  features: z
    .array(z.string())
    .min(1, "At least one feature is required")
    .max(30, "Maximum 30 features allowed"),
});

export type GraphicDesignProjectFormData = z.infer<
  typeof graphicDesignProjectSchema
>;

// AI Automation Project Schema
export const aiAutomationProjectSchema = baseProjectSchema.extend({
  projectUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  demoUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  aiTechnologies: z
    .array(z.string())
    .min(1, "At least one AI technology is required")
    .max(20, "Maximum 20 technologies allowed"),
  automationType: z
    .string()
    .min(1, "Automation type is required")
    .max(100, "Automation type must be less than 100 characters"),
  integrations: z
    .array(z.string())
    .max(30, "Maximum 30 integrations allowed")
    .optional(),
  features: z
    .array(z.string())
    .min(1, "At least one feature is required")
    .max(30, "Maximum 30 features allowed"),
  results: z.string().max(500).optional().or(z.literal("")).or(z.null()),
});

export type AIAutomationProjectFormData = z.infer<
  typeof aiAutomationProjectSchema
>;

// Mobile App Project Schema
export const mobileAppProjectSchema = baseProjectSchema.extend({
  appStoreUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  playStoreUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  demoUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  platforms: z
    .array(z.string())
    .min(1, "At least one platform is required")
    .max(10, "Maximum 10 platforms allowed"),
  techStack: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .max(20, "Maximum 20 technologies allowed"),
  appType: z
    .string()
    .min(1, "App type is required")
    .max(100, "App type must be less than 100 characters"),
  features: z
    .array(z.string())
    .min(1, "At least one feature is required")
    .max(30, "Maximum 30 features allowed"),
  downloads: z.string().max(50).optional().or(z.literal("")).or(z.null()),
  rating: z.string().max(20).optional().or(z.literal("")).or(z.null()),
});

export type MobileAppProjectFormData = z.infer<typeof mobileAppProjectSchema>;

export const vibeCodingProjectSchema = baseProjectSchema.extend({
  projectUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  githubUrl: z.string().url().optional().or(z.literal("")).or(z.null()),

  aiTools: z
    .array(z.string())
    .min(1, "At least one AI tool is required")
    .max(15, "Maximum 15 AI tools allowed"),

  techStack: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .max(20, "Maximum 20 technologies allowed"),

  features: z
    .array(z.string())
    .min(1, "At least one feature is required")
    .max(30, "Maximum 30 features allowed"),
});

export type VibeCodingProjectFormData = z.infer<typeof vibeCodingProjectSchema>;

// AI Agent Building Project Schema
export const aiAgentBuildingProjectSchema = baseProjectSchema.extend({
  demoUrl: z.string().url().optional().or(z.literal("")).or(z.null()),
  githubUrl: z.string().url().optional().or(z.literal("")).or(z.null()),

  aiModels: z
    .array(z.string())
    .min(1, "At least one AI model is required")
    .max(10, "Maximum 10 AI models allowed"),

  agentType: z
    .string()
    .min(1, "Agent type is required")
    .max(100, "Agent type must be less than 100 characters"),

  frameworks: z
    .array(z.string())
    .min(1, "At least one framework is required")
    .max(10, "Maximum 10 frameworks allowed"),

  integrations: z
    .array(z.string())
    .max(20, "Maximum 20 integrations allowed")
    .optional(),

  capabilities: z
    .array(z.string())
    .min(1, "At least one capability is required")
    .max(20, "Maximum 20 capabilities allowed"),

  techStack: z
    .array(z.string())
    .min(1, "At least one technology is required")
    .max(20, "Maximum 20 technologies allowed"),

  features: z
    .array(z.string())
    .min(1, "At least one feature is required")
    .max(30, "Maximum 30 features allowed"),
});

export type AIAgentBuildingProjectFormData = z.infer<
  typeof aiAgentBuildingProjectSchema
>;

// Union type for all project types
export type ProjectFormData =
  | WebDevelopmentProjectFormData
  | GraphicDesignProjectFormData
  | AIAutomationProjectFormData
  | MobileAppProjectFormData
  | VibeCodingProjectFormData
  | AIAgentBuildingProjectFormData;

// Helper to get schema by category
export function getProjectSchema(category: string) {
  switch (category) {
    case "web-development":
      return webDevelopmentProjectSchema;
    case "graphics-design":
      return graphicDesignProjectSchema;
    case "ai-automation":
      return aiAutomationProjectSchema;
    case "mobile-app-development":
      return mobileAppProjectSchema;
    case "vibe-coding":
      return vibeCodingProjectSchema;
    case "ai-agent-building":
      return aiAgentBuildingProjectSchema;
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}
