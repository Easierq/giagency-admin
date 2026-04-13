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
import { ArrayInput } from "./ArrayInput";
import { ImageInput } from "./ImageInput";
import { MultiImageInput } from "./MultiImageInput";
import {
  getProjectSchema,
  type ProjectFormData,
} from "@/lib/validations/project";
import { autoGenerateSlug, formatProjectData } from "@/lib/utils/form-helpers";
import { createProject, updateProject } from "@/lib/api/services";
import { ServiceCategory } from "@/types/api";

interface ProjectFormProps {
  category: ServiceCategory;
  initialData?: any;
  mode: "create" | "edit";
}

export function ProjectForm({ category, initialData, mode }: ProjectFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(mode === "create");

  const schema = getProjectSchema(category);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      slug: "",
      name: "",
      description: "",
      image: "",
      images: [],
      badge: "",
      popular: false,
      featured: false,
      clientName: "",
      completionDate: "",
      status: "DRAFT",
      // Service-specific defaults
      techStack: [],
      features: [],
      designTools: [],
      platforms: [],
      softwareUsed: [],
      colorPalette: [],
      aiTechnologies: [],
      integrations: [],
      //new
      aiTools: [],
      aiModels: [],
      frameworks: [],
      capabilities: [],
    },
  });

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    if (autoSlug && mode === "create") {
      const slug = autoGenerateSlug(name);
      form.setValue("slug", slug);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      const formattedData = formatProjectData(data);
      if (mode === "create") {
        await createProject(category, formattedData);
        showToast.success("Project created successfully");
      } else {
        await updateProject(category, initialData.slug, formattedData);
        showToast.success("Project updated successfully");
      }
      router.push(`/admin/projects/${category}`);
      router.refresh();
    } catch (error) {
      console.error("Form submission error:", error);
      showToast.error(
        error instanceof Error ? error.message : "Failed to save project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="E-Commerce Platform"
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

            {/* Slug */}
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
                        placeholder="ecommerce-platform"
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

          {/* Description */}
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
                  Detailed description of the project (minimum 10 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Name */}
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

            {/* Completion Date */}
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
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Media</h2>

          {/* Main Image */}
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

          {/* Additional Images */}
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
        </div>

        {/* Service-Specific Fields */}
        <ServiceSpecificFields category={category} form={form} />

        {/* Settings Section */}
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <h2 className="text-2xl font-bold">Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badge */}
            <FormField
              control={form.control}
              name="badge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Featured, New, etc." />
                  </FormControl>
                  <FormDescription>
                    Optional badge to display on the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
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
            {/* Featured */}
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
                      Show this project in featured sections
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

            {/* Popular */}
            <FormField
              control={form.control}
              name="popular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Popular Project</FormLabel>
                    <FormDescription>
                      Mark this as a popular project
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
                  window.open(`/services/${category}/${slug}`, "_blank");
                }
              }}
              disabled={!form.getValues("slug")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>

          <Button type="submit" disabled={isSubmitting} className="">
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <Save className="w-4 h-4 mr-2" />
            {mode === "create" ? "Create Project" : "Update Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// ============================================
// Service-Specific Fields Component
// ============================================

function ServiceSpecificFields({
  category,
  form,
}: {
  category: string;
  form: any;
}) {
  switch (category) {
    case "web-development":
      return <WebDevelopmentFields form={form} />;
    case "graphics-design":
      return <GraphicDesignFields form={form} />;
    case "ai-automation":
      return <AiAutomationFields form={form} />;
    case "mobile-app-development":
      return <MobileAppFields form={form} />;
    case "vibe-coding":
      return <VibeCodingFields form={form} />;
    case "ai-agent-building":
      return <AIAgentBuildingFields form={form} />;
    default:
      return null;
  }
}

// Web Development Fields
function WebDevelopmentFields({ form }: { form: any }) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="text-2xl font-bold">Web Development Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="projectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com" />
              </FormControl>
              <FormDescription>Live website URL</FormDescription>
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
              <FormDescription>Repository URL (if public)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="techStack"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Tech Stack *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Next.js, TypeScript, etc."
              description="Technologies used in this project"
              error={form.formState.errors.techStack?.message}
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
              label="Features *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Responsive Design, Admin Dashboard, etc."
              description="Key features of this project"
              error={form.formState.errors.features?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// Graphic Design Fields
function GraphicDesignFields({ form }: { form: any }) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="text-2xl font-bold">Graphic Design Details</h2>

      <FormField
        control={form.control}
        name="projectType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Type *</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Logo Design, Brand Identity, etc."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="designTools"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Design Tools *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Figma, Photoshop, Illustrator, etc."
              description="Tools used for this design"
              error={form.formState.errors.designTools?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="colorPalette"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Color Palette"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="#FF5733, #C70039, etc."
              description="Hex color codes used in the design"
              error={form.formState.errors.colorPalette?.message}
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
              label="Features *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Custom Typography, Minimalist Design, etc."
              description="Design features and highlights"
              error={form.formState.errors.features?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function AiAutomationFields({ form }: { form: any }) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="text-2xl font-bold">Ai Automation Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="projectUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Project URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/..." />
              </FormControl>
              <FormDescription>Link to project url</FormDescription>
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
                <Input {...field} placeholder="https://example.com" />
              </FormControl>
              <FormDescription>Demo URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="automationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Automation Type *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Workflow Automation, Chatbot, Data Processing etc."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="results"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Results</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ROI, time saved." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="aiTechnologies"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Ai Technologies *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="GPT-4, Claude, Google Gemini, Langchain OpenAI API etc."
              description="Artificial intelligence platforms used"
              error={form.formState.errors.platforms?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="integrations"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Integrations *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Slack, Gmail, Zapier, etc."
              description="Nodes integrated."
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
              label="Features *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Agents, Data Scraping, Text Formatting."
              description="Services and features provided"
              error={form.formState.errors.features?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function MobileAppFields({ form }: { form: any }) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="text-2xl font-bold">Mobile App Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="appStoreUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>AppStore URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://appstore.com/..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="playStoreUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Playstore URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://playstore.com/..." />
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
                <Input {...field} placeholder="https://example.com" />
              </FormControl>
              <FormDescription>Demo URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Type *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="E-commerce, Social, Productivity, Gaming."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="platforms"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Platforms *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="iOS, Android, Cross-platform."
              description=""
              error={form.formState.errors.platforms?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="techStack"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Tech Stack *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="React Native, TypeScript, Flutter, Swift, Kotlin."
              description="Technologies used in this project"
              error={form.formState.errors.techStack?.message}
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
              placeholder="Biometric, Messaging, etc."
              description="Services and features provided"
              error={form.formState.errors.features?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function VibeCodingFields({ form }: { form: any }) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="text-2xl font-bold">Vibe Coding Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="projectUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Live Project URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com" />
              </FormControl>
              <FormDescription>
                Live demo or deployed application
              </FormDescription>
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
              <FormDescription>Repository URL (if public)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="aiTools"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="AI Tools Used *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Cursor, v0, Claude, GitHub Copilot, Bolt.new, etc."
              description="AI tools and platforms used for code generation"
              error={form.formState.errors.aiTools?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="techStack"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Tech Stack *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Next.js, React, TypeScript, Tailwind, etc."
              description="Technologies and frameworks used"
              error={form.formState.errors.techStack?.message}
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
              label="Features *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Authentication, Real-time updates, API integration, etc."
              description="Key features built with AI assistance"
              error={form.formState.errors.features?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

// AI Agent Building Fields Component
function AIAgentBuildingFields({ form }: { form: any }) {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <h2 className="text-2xl font-bold">AI Agent Building Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="demoUrl"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Demo/Playground URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://example.com/demo" />
              </FormControl>
              <FormDescription>Live demo or playground link</FormDescription>
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
              <FormDescription>Repository URL (if public)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agentType"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Agent Type *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Chatbot, Automation Agent, Research Agent, Code Agent, etc."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="aiModels"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="AI Models *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="GPT-4, Claude 3.5 Sonnet, Gemini Pro, etc."
              description="AI models powering the agent"
              error={form.formState.errors.aiModels?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="frameworks"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Frameworks *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="LangChain, CrewAI, AutoGen, Custom Framework, etc."
              description="Agent frameworks and libraries used"
              error={form.formState.errors.frameworks?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="integrations"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Integrations"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Slack, Discord, Telegram, API, Database, etc."
              description="Third-party integrations and platforms"
              error={form.formState.errors.integrations?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="capabilities"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Agent Capabilities *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Answer questions, Automate tasks, Research, Generate code, etc."
              description="What the agent can do"
              error={form.formState.errors.capabilities?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="techStack"
        render={({ field }) => (
          <FormItem>
            <ArrayInput
              label="Tech Stack"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Python, Node.js, FastAPI, Vector DB, etc."
              description="Backend technologies used"
              error={form.formState.errors.techStack?.message}
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
              label="Features *"
              value={field.value || []}
              onChange={field.onChange}
              placeholder="Context awareness, Memory, Multi-step reasoning, etc."
              description="Agent features and capabilities"
              error={form.formState.errors.features?.message}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
