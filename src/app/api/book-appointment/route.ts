import { getUser } from "@/lib/getUser";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { bloodBankId, date, status, userPhone } = await req.json();

    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!bloodBankId || !date || !status || !userPhone) {
      return NextResponse.json(
        { message: "some details are missing" },
        { status: 400 }
      );
    }

    const data = await prisma.appointment.create({
      data: {
        date: new Date(date),
        status,
        user: {
          connect: {
            id: user.id,
          },
        },
        bloodBank: {
          connect: {
            id: bloodBankId,
          },
        },
        phone: userPhone,
      },
    });

    return NextResponse.json({ data }, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Some entries are missing in the url query" },
        { status: 400 }
      );
    }

    const data =
      user.role === "admin"
        ? await prisma.appointment.findMany({
            where: {
              status: "Scheduled",
            },
            include: {
              bloodBank: true,
              user: {
                select: {
                  email: true,
                  name: true,
                },
              },
            },
          })
        : await prisma.appointment.findMany({
            where: {
              user: {
                id: user.id,
              },
              status: "Scheduled",
            },
            include: {
              bloodBank: true,
            },
          });

    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
