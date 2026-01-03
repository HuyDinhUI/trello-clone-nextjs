import { cookies } from "next/headers";

export const PUT = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/authorization/refresh_token`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${refreshToken?.value}`,
        },
        cache: "no-cache",
      }
    ).then((res) => res.json());
    return Response.json({ data }, { status: 200 });
  } catch (err: any) {
    return Response.json({ message: err.response?.message }, { status: 401 });
  }
};
