import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res.accessToken;
  const refreshToken = res.refreshToken;
  if (!accessToken) {
    return Response.json({ message: "There is not token" }, { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  if (refreshToken) {
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  return Response.json({ res }, { status: 200 });
}
