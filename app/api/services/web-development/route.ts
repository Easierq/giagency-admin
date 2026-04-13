import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all web development projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "PUBLISHED";
    const featured = searchParams.get("featured");
    const popular = searchParams.get("popular");
    const limit = searchParams.get("limit");

    const where: any = {
      status: status as any,
    };

    if (featured === "true") {
      where.featured = true;
    }

    if (popular === "true") {
      where.popular = true;
    }

    const projects = await prisma.webDevelopmentProject.findMany({
      where,
      orderBy: [
        { featured: "desc" },
        { popular: "desc" },
        { createdAt: "desc" },
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error("Error fetching web development projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create new web development project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const project = await prisma.webDevelopmentProject.create({
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        image: body.image,
        images: body.images || [],
        badge: body.badge,
        popular: body.popular || false,
        featured: body.featured || false,
        clientName: body.clientName,
        completionDate: body.completionDate
          ? new Date(body.completionDate)
          : null,
        projectUrl: body.projectUrl,
        githubUrl: body.githubUrl,
        techStack: body.techStack || [],
        features: body.features || [],
        status: body.status || "DRAFT",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating web development project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
