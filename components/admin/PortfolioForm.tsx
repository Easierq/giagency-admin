"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { showToast } from "@/store/uiStore";
import { ArrayInput } from "@/components/admin/ArrayInput";
import { ImageInput } from "@/components/admin/ImageInput";
import { MultiImageInput } from "@/components/admin/MultiImageInput";
import {
  portfolioProjectSchema,
  type PortfolioProjectFormData,
} from "@/lib/validations/portfolio";
import { autoGenerateSlug } from "@/lib/utils/form-helpers";
import { VideoInput } from "./VideoInput";

interface PortfolioFormProps {
  initialData?: any;
  mode: "create" | "edit";
}

const CATEGORIES = [
  { label: "Web Development", value: "web-development" },
  { label: "Graphic Design", value: "graphic-design" },
  { label: "Video Editing", value: "video-editing" },
  { label: "Content Creation", value: "content-creation" },
  { label: "Sales Copywriting", value: "sales-copywriting" },
  { label: "Social Media Management", value: "social-media-management" },
  { label: "AI Automation", value: "ai-automation" },
  { label: "Mobile App Development", value: "mobile-app-development" },
];

export function PortfolioForm({ initialData, mode }: PortfolioFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(mode === "create");

  const form = useForm<PortfolioProjectFormData>({
    resolver: zodResolver(portfolioProjectSchema),
    defaultValues: initialData || {
      slug: "",
      name: "",
      description: "",
      image: "",
      images: [],
      videoUrl: "",
      badge: "",
      popular: false,
      featured: true,
      clientName: "",
      completionDate: "",
      projectUrl: "",
      githubUrl: "",
      demoUrl: "",
      category: "",
      categorySlug: "",
      techStack: [],
      features: [],
      tools: [],
      platforms: [],
      projectType: "",
      results: "",
      duration: "",
      metrics: "",
      order: 0,
      showcaseText: "",
      status: "PUBLISHED",
    },
  });

  const handleNameChange = (name: string) => {
    if (autoSlug && mode === "create") {
      const slug = autoGenerateSlug(name);
      form.setValue("slug", slug);
    }
  };

  const handleCategoryChange = (categorySlug: string) => {
    const category = CATEGORIES.find((c) => c.value === categorySlug);
    if (category) {
      form.setValue("category", category.label);
    }
  };

  const onSubmit = async (data: PortfolioProjectFormData) => {
    try {
      setIsSubmitting(true);

      const endpoint =
        mode === "create"
          ? "/api/portfolio"
          : `/api/portfolio/${initialData.slug}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        showToast.success(
          mode === "create"
            ? "Portfolio project created successfully"
            : "Portfolio project updated successfully"
        );
        router.push("/admin/portfolio");
        router.refresh();
      } else {
        showToast.error(result.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast.error("Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Amazing Portfolio Project"
                      onChange={(e) => {
                        field.onChange(e);
                        handleNameChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug *</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        {...field}
                        placeholder="amazing-portfolio-project"
                        disabled={autoSlug && mode === "create"}
                      />
                      {mode === "create" && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setAutoSlug(!autoSlug)}
                        >
                          {autoSlug ? "Manual" : "Auto"}
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (lowercase with hyphens)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your project in detail..."
                    rows={6}
                  />
                </FormControl>
                <FormDescription>
                  Main project description (minimum 10 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showcaseText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Showcase Text</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Optional custom text for portfolio slider..."
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  Custom description for portfolio showcase (optional, will use
                  main description if empty)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="categorySlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCategoryChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Tech Startup Inc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="0"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Lower numbers appear first in portfolio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Media</h2>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <ImageInput
                  label="Main Image *"
                  value={field.value}
                  onChange={field.onChange}
                  error={form.formState.errors.image?.message}
                  description="Primary project thumbnail (required)"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <MultiImageInput
                  label="Additional Images"
                  value={field.value || []}
                  onChange={field.onChange}
                  error={form.formState.errors.images?.message}
                  description="Optional gallery images"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </FormControl>
                <FormDescription>
                  YouTube, Vimeo, or direct video URL (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <VideoInput
                  label="Project Video"
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={form.formState.errors.videoUrl?.message}
                  description="Upload a video or paste YouTube/Vimeo URL"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Project Links */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Project Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Project URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://github.com/..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demo URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://demo.example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Technical Details</h2>

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem>
                <ArrayInput
                  label="Tech Stack / Technologies"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Next.js, React, TypeScript, etc."
                  description="Technologies and frameworks used"
                  error={form.formState.errors.techStack?.message}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tools"
            render={({ field }) => (
              <FormItem>
                <ArrayInput
                  label="Tools / Software"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Figma, Photoshop, Premiere Pro, etc."
                  description="Design tools, editing software, or other tools used"
                  error={form.formState.errors.tools?.message}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="platforms"
            render={({ field }) => (
              <FormItem>
                <ArrayInput
                  label="Platforms"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="iOS, Android, Web, YouTube, etc."
                  description="Target platforms"
                  error={form.formState.errors.platforms?.message}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <ArrayInput
                  label="Features"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Real-time updates, Responsive design, etc."
                  description="Key features and highlights"
                  error={form.formState.errors.features?.message}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="E-commerce, Landing Page, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration / Timeframe</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="3 months, 2:30, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metrics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metrics / Stats</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="10K downloads, 4.8★ rating, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="results"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Results / Impact</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Increased conversions by 45%, Generated $100K revenue, etc."
                    rows={3}
                  />
                </FormControl>
                <FormDescription>Measurable results achieved</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Featured, Award Winning, etc."
                    />
                  </FormControl>
                  <FormDescription>
                    Optional badge to display on the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Featured Project
                    </FormLabel>
                    <FormDescription>
                      Show in homepage portfolio slider
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="popular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Popular Project</FormLabel>
                    <FormDescription>Mark as a popular project</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-wrap gap-4 md:justify-end sticky bottom-0 bg-white border-t p-4 rounded-lg">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const slug = form.getValues("slug");
                if (slug) {
                  window.open(`/portfolio/${slug}`, "_blank");
                }
              }}
              disabled={!form.getValues("slug")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <Save className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Project" : "Update Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
