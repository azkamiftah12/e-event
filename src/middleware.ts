import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import jwt_decode from "jwt-decode";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log(request.nextUrl.pathname, 'urlnyaa')
  // console.log(request.cookies, 'cookie')
  const urlAdmin = [
    "/admin",
    "/internal/pelatihan",
    "/internal/validasipelatihan",
    "/internal/batch",
    "/manajemen/jenispekerjaan",
    "/manajemen/jenispelatihan",
    "/manajemen/kabupaten",
    "/manajemen/narasumber",
    "/manajemen/provinsi",
    "/manajemen/user",
  ];
  const urlPenyelenggara = ["/penyelenggara", "/penyelenggara/managepelatihan"];

  try {
    const token = request.cookies.get("token");
    // console.log(token., 'tokennya')
    const decodeToken = jwt_decode(token?.value);
    const { username, role_user, nama_user } = decodeToken;
    console.log(username, role_user, nama_user);
    console.log(request.nextUrl.host);
    console.log(request.nextUrl.origin);
    // console.log(request.nextUrl.hostname)
    // console.log(request.nextUrl.basePath)

    //middleware admin start
    if (
      urlAdmin.includes(request.nextUrl.pathname) &&
      role_user.toString().toLowerCase() !== "admin"
    ) {
      return NextResponse.redirect(request.nextUrl.origin + "/latihan");
    }
    //middleware admin end

    //middleware penyelenggara start
    if (
      urlPenyelenggara.includes(request.nextUrl.pathname) &&
      role_user.toString().toLowerCase() !== "penyelenggara"
    ) {
      return NextResponse.redirect(request.nextUrl.origin + "/Login");
    }
    //middleware penyelenggara end

    return NextResponse.next();
  } catch (e) {
    //kalo role kosong start
    if (urlAdmin.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(request.nextUrl.origin + "/Login");
    }

    if (urlPenyelenggara.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(request.nextUrl.origin + "/Login");
    }
    //kalo role kosong end
    console.log(e, "error middle");
    return NextResponse.next();
  }
  // console.log(window.localStorage.getItem('a'), 'getlocal')
  // return NextResponse.redirect(new URL('/home', request.url));
  // return NextResponse.redirect(new URL('/home', request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// };
