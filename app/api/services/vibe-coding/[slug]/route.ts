import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch single vibe coding project by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.vibeCodingProject.findUnique({
      where: { slug: params.slug },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching vobe coding project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT - Update vibe coding project
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();

    const project = await prisma.vibeCodingProject.update({
      where: { slug: params.slug },
      data: {
        name: body.name,
        description: body.description,
        image: body.image,
        images: body.images,
        badge: body.badge,
        popular: body.popular,
        featured: body.featured,
        clientName: body.clientName,
        completionDate: body.completionDate
          ? new Date(body.completionDate)
          : null,
        projectUrl: body.projectUrl,
        githubUrl: body.githubUrl,
        techStack: body.techStack,
        aiTools: body.techStack,
        features: body.features,
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error updating vibe coding project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete vibe coding project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.vibeCodingProject.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting vibe coding project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
