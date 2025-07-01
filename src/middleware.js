import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "909ab1a3-c7c6-4b0f-89e8-18313636ed28");
  requestHeaders.set("x-createxyz-project-group-id", "d5abe277-2d46-4e5b-85ae-1f4ae31a1a06");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}