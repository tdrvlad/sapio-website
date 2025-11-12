import { NextResponse } from "next/server";

// Simple locale scaffold; default to EN, support /ro path prefix later
export function middleware() {
	return NextResponse.next();
}


