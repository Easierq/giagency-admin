import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch single mobile app project by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.mobileAppProject.findFirst({
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
    console.error("Error fetching mobile app project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT - Update mobile app project
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();

    const project = await prisma.mobileAppProject.update({
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
        appStoreUrl: body.appStoreUrl,
        playStoreUrl: body.playStoreUrl,
        demoUrl: body.demoUrl,
        platforms: body.platforms,
        techStack: body.techStack,
        appType: body.appType,
        features: body.features,
        downloads: body.downloads,
        rating: body.rating,
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error updating mobile app project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete mobile app project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.mobileAppProject.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting mobile app project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
