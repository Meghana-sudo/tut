
import { writeClient } from "@/sanity/lib/wirte-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    await writeClient
      .patch(id)
      .inc({ views: 1 }) // ✅ safer than .set()
      .commit();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sanity error:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
