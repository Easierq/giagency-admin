import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch single ai agent project by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.aIAgentBuildingProject.findUnique({
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
    console.error("Error fetching ai agent project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT - Update ai agent project
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();

    const project = await prisma.aIAgentBuildingProject.update({
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
        demoUrl: body.projectUrl,
        githubUrl: body.githubUrl,
        agentType: body.agentType,
        techStack: body.techStack,
        features: body.features,
        aiModels: body.aiModels,
        frameworks: body.frameworks,
        integrations: body.integrations,
        capabilities: body.capabilities,
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error updating ai agent project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete ai agent project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.aIAgentBuildingProject.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting ai agent project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
