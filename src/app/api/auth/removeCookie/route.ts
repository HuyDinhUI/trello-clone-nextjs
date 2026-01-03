import { cookies } from "next/headers";

export async function DELETE() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return Response.json({ message: "Log out is success" }, { status: 200 });
}
