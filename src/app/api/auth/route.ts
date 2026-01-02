export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res.accessToken;

  if (!accessToken) {
    return Response.json({ message: "There is not token" }, { status: 400 });
  }

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `accessToken=${accessToken}; Path=/; Secure=true; Samesite=None; HttpOnly=true;`,
      },
    }
  );
}
