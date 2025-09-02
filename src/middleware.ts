import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Simple locale scaffold; default to EN, support /ro path prefix later
export function middleware(req: NextRequest) {
	return NextResponse.next();
}


