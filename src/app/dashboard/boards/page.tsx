import Boards from "./boards";
import { cookies } from "next/headers";

const BoardsPage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken");

  const data = await fetch(`${process.env.API_URI}/boards`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-store",
  }).then((res) => res.json());

  return <Boards data={data} />;
};

export default BoardsPage;
