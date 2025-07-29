import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch("https://stg.invyti.com/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "X-Device-Id": req.headers.get("X-Device-Id") || "", // Ambil device id dari header
      "User-Agent": req.headers.get("User-Agent") || "Unknown",
     },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}