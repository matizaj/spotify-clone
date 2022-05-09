import { NextResponse, NextRequest } from "next/server";

const signedInPages: string[] = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (signedInPages.find((p) => p === url.pathname)) {
    const token = req.cookies["spotify-clone-token"];
    if (!token) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
