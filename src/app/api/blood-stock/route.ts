import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { appointmentId, bloodType, quantity, bloodBankId } =
      await req.json();

    if (!appointmentId || !bloodType || !quantity || !bloodBankId) {
      return NextResponse.json(
        { error: "Some entries are missing" },
        { status: 400 }
      );
    }

    // Use Prisma transaction for atomicity
    const [updatedAppointment, newBloodStock] = await prisma.$transaction([
      prisma.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: "Completed",
        },
      }),
      prisma.bloodStock.create({
        data: {
          bloodType,
          quantity: Number(quantity),
          bloodBankId,
        },
      }),
    ]);

    return NextResponse.json(
      { updatedAppointment, newBloodStock },
      { status: 201 }
    );
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

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;

    const bloodType = query.get("blood-type");
    const city = query.get("city");
    const state = query.get("state");

    if (!city || !state || !bloodType) {
      return NextResponse.json(
        { error: "Some entries are missing in the URL query" },
        { status: 400 }
      );
    }

    const data = await prisma.bloodBank.findMany({
      where: {
        city: city.toLowerCase(),
        state: state.toLowerCase(),
        bloodStocks: {
          some: {
            bloodType: bloodType.toUpperCase(),
          },
        },
      },
      include: {
        bloodStocks: true,
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
