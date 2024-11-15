import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface BloodBankRequestBody {
  name: string;
  city: string;
  state: string;
  phone: string;
  address: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, city, state, phone, address }: BloodBankRequestBody =
      await req.json();

    if (!name || !city || !state || !phone || !address) {
      return NextResponse.json(
        { error: "Some entries are missing" },
        { status: 400 }
      );
    }

    const data = await prisma.bloodBank.create({
      data: {
        name,
        city: city.toLowerCase(),
        state: state.toLowerCase(),
        phone,
        address,
      },
    });

    return NextResponse.json({ message: "new blood bank created", data });
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

    const city = query.get("city");
    const state = query.get("state");

    console.log(city?.toLowerCase() ?? "low", state);
    const data = await prisma.bloodBank.findMany({
      where: {
        city: city ? city.toLowerCase() : undefined,
        state: state ? state.toLowerCase() : undefined,
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
