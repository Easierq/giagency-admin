import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const portfolioProject = await prisma.portfolioProject.findUnique({
      where: { slug: params.slug },
    });

    if (!portfolioProject) {
      return NextResponse.json(
        { success: false, error: "Portfolio project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: portfolioProject,
    });
  } catch (error) {
    console.error("Error fetching portfolio project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch portfolio project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();

    // Check if project exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { slug: params.slug },
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: "Portfolio project not found" },
        { status: 404 }
      );
    }

    const portfolioProject = await prisma.portfolioProject.update({
      where: { slug: params.slug },
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        images: body.images || [],
        videoUrl: body.videoUrl || null,
        badge: body.badge || null,
        popular: body.popular ?? false,
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
        order: body.order ?? 0,
        showcaseText: body.showcaseText || null,
        status: body.status || "PUBLISHED",
      },
    });

    return NextResponse.json({
      success: true,
      data: portfolioProject,
      message: "Portfolio project updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating portfolio project:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update portfolio project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check if project exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { slug: params.slug },
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: "Portfolio project not found" },
        { status: 404 }
      );
    }

    await prisma.portfolioProject.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({
      success: true,
      message: "Portfolio project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting portfolio project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete portfolio project" },
      { status: 500 }
    );
  }
}
