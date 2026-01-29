import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/grocery-list/pdf`,
    {
      method: "GET",
      headers: {
        ...(accessToken ? { Authorization: accessToken } : {}),
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to generate PDF" },
      { status: 500 },
    );
  }

  const pdfBuffer = await res.arrayBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=grocery-list.pdf",
    },
  });
}
