import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      userName,
      userEmail,
      userPhone,
      bloodBankId,
      date,
      status,
    } = await req.json();

    if (
      !userId ||
      !userName ||
      !userEmail ||
      !userPhone ||
      !bloodBankId ||
      !date ||
      !status
    ) {
      return NextResponse.json(
        { message: "some details are missing" },
        { status: 400 }
      );
    }

    const data = await prisma.appointment.create({
      data: {
        userId,
        userName,
        userEmail,
        userPhone,
        bloodBankId,
        date,
        status,
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

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;

    const userId = query.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Some entries are missing in the url query" },
        { status: 400 }
      );
    }

    const data =
      userId === "admin"
        ? await prisma.appointment.findMany({
            where: {
              status: "Scheduled",
            },
            include: {
              bloodBank: true,
            },
          })
        : await prisma.appointment.findMany({
            where: {
              userId,
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
