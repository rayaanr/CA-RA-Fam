import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { individualSchema } from "../../../global/zodSchemas";
import { nanoid } from "nanoid";

// Get all individuals, if passed a individualId, get that individual
export async function GET(req: NextRequest) {
    const individuals = await prisma.individual.findMany();
    return NextResponse.json(individuals);
}

// Create an individual
export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = individualSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    await prisma.individual.create({
        data: {
            id: nanoid(),
            firstName: body.firstName,
            lastName: body.lastName,
            gender: body.gender,
        },
    });
    return NextResponse.json(
        { message: `Individual ${body.firstName} ${body.lastName ? body.lastName : ''} created` },
        { status: 201 }
    );
}

// Delete an individual
export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { individualId } = body;
    const individualExists = await prisma.individual.findUnique({ where: { id: individualId } });
    if (!individualExists) {
        return NextResponse.json({ message: "Individual does not exist" }, { status: 404 });
    }
    await prisma.individual.delete({ where: { id: individualId } });
    return NextResponse.json({ message: "Individual deleted" });
}