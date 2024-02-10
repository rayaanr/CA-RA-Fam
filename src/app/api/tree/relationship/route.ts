// Import necessary modules and schemas
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { relationshipSchema } from "../../../global/zodSchemas";
import { nanoid } from "nanoid";

// Get all relationships
export async function GET(req: NextRequest) {
    const relationships = await prisma.relationship.findMany();
    return NextResponse.json(relationships);
}

// Note :
// In the "parent" relationship type, individual1Id is the parent and individual2Id is the child.
// In the "spouse" relationship type, in a family tree context, mainly go with the male side

// Create a relationship
export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = relationshipSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const { individual1Id, individual2Id, relationshipType } = validation.data;
    const individualsExist = await Promise.all([
        prisma.individual.findUnique({ where: { id: individual1Id } }),
        prisma.individual.findUnique({ where: { id: individual2Id } }),
    ]);
    if (!individualsExist[0] || !individualsExist[1]) {
        return NextResponse.json(
            { message: "One or both individuals do not exist" },
            { status: 404 }
        );
    }
    await prisma.relationship.create({
        data: {
            id: nanoid(), // Generate a unique ID for the relationship
            individual1Id,
            individual2Id,
            relationshipType,
        },
    });

    return NextResponse.json(
        { message: "Relationship created" },
        { status: 201 }
    );
}

// Delete a relationship
export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { relationshipId } = body;
    const relationshipExists = await prisma.relationship.findUnique({
        where: { id: relationshipId },
    });
    if (!relationshipExists) {
        return NextResponse.json(
            { message: "Relationship does not exist" },
            { status: 404 }
        );
    }
    await prisma.relationship.delete({ where: { id: relationshipId } });

    return NextResponse.json({ message: "Relationship deleted" }, { status: 200 });
}
