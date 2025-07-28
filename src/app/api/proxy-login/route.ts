import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch("https://stg.invyti.com/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // signal: controller.signal, // bisa pakai AbortController untuk timeout manual
    });

    // Tetap tunggu response meskipun error
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: "Invalid JSON response from upstream API" };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    // Jika fetch gagal (misal: timeout, network error)
    return NextResponse.json(
      {
        status: "error",
        code: 502,
        message: "Application failed to respond",
        detail: error?.message || "Unknown error",
      },
      { status: 502 }
    );
  }
}