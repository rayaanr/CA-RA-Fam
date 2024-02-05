import { NextResponse } from "next/server";
// import { z } from "zod";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const schema = z.object({
//   name: z.string(),
//   parent: z.string(),
// });

// export async function POST(req: Request) {
//   const body = await req.json();
//   const result = schema.safeParse(body);
//   if (result.success) {
//     try {
//       const newMember = await prisma.memberProfile.create({
//         data: {
//           name: result.data.name,
//           parent: result.data.parent,
//         },
//       });
//       return NextResponse.json({ message: "Member profile created!"}, { status: 201 });
//     } catch (error) {
//       console.error("Failed to create a member profile:", error);
//       return NextResponse.json({ message: "Failed to create member profile!" }, { status: 500 });
//     }
//   } else {
//     return NextResponse.json({ message: "Invalid input!" }, { status: 400 });
//   }
// }


export async function GET() {
  try {
    return NextResponse.json({ message: "Member profiles fetched!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch member profiles!" }, { status: 500 });
  }
}
