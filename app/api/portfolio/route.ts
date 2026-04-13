import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");
    const categorySlug = searchParams.get("category");
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");

    const where: any = {};

    if (featured === "true") {
      where.featured = true;
    }

    if (status) {
      where.status = status;
    }

    if (categorySlug) {
      where.categorySlug = categorySlug;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const portfolioProjects = await prisma.portfolioProject.findMany({
      where,
      orderBy: { order: "asc" },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: portfolioProjects,
      count: portfolioProjects.length,
    });
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (
      !body.slug ||
      !body.name ||
      !body.description ||
      !body.image ||
      !body.category ||
      !body.categorySlug
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const portfolioProject = await prisma.portfolioProject.create({
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        image: body.image,
        images: body.images || [],
        videoUrl: body.videoUrl || null,
        badge: body.badge || null,
        popular: body.popular || false,
        featured: body.featured ?? true,
        clientName: body.clientName || null,
        completionDate: body.completionDate
          ? new Date(body.completionDate)
          : null,
        projectUrl: body.projectUrl || null,
        githubUrl: body.githubUrl || null,
        demoUrl: body.demoUrl || null,
        category: body.category,
        categorySlug: body.categorySlug,
        techStack: body.techStack || [],
        features: body.features || [],
        tools: body.tools || [],
        platforms: body.platforms || [],
        projectType: body.projectType || null,
        results: body.results || null,
        duration: body.duration || null,
        metrics: body.metrics || null,
        order: body.order || 0,
        showcaseText: body.showcaseText || null,
        status: body.status || "PUBLISHED",
      },
    });

    return NextResponse.json({
      success: true,
      data: portfolioProject,
      message: "Portfolio project created successfully",
    });
  } catch (error: any) {
    console.error("Error creating portfolio project:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create portfolio project" },
      { status: 500 }
    );
  }
}
