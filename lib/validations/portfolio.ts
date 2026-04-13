import { z } from "zod";

export const portfolioProjectSchema = z.object({
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
  videoUrl: z.preprocess((val) => val ?? "", z.string().max(50)).optional(),

  badge: z.string().max(50).optional(),
  popular: z.boolean().default(false),
  featured: z.boolean().default(true),

  clientName: z.string().max(200).optional(),
  completionDate: z.string().optional(),
  projectUrl: z.preprocess((val) => val ?? "", z.string().max(50)).optional(),
  githubUrl: z.preprocess((val) => val ?? "", z.string().max(50)).optional(),
  demoUrl: z.preprocess((val) => val ?? "", z.string().max(50)).optional(),

  category: z.string().min(1, "Category is required"),
  categorySlug: z.string().min(1, "Category slug is required"),

  techStack: z.array(z.string()).max(20, "Maximum 20 items allowed").optional(),
  features: z.array(z.string()).max(30, "Maximum 30 items allowed").optional(),
  tools: z.array(z.string()).max(20, "Maximum 20 items allowed").optional(),
  platforms: z.array(z.string()).max(10, "Maximum 10 items allowed").optional(),

  projectType: z.string().max(100).optional(),
  results: z.string().max(500).optional(),
  duration: z.string().max(50).optional(),
  metrics: z.string().max(200).optional(),

  order: z.number().int().min(0).default(0),
  showcaseText: z.string().max(1000).optional(),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
});

export type PortfolioProjectFormData = z.infer<typeof portfolioProjectSchema>;
