import Profile from "@/app/me/profile";
import envConfig from "../../../config";
import { cookies } from "next/headers";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  
  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionToken?.value}`
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    if (!res.ok) {
      throw data;
    }
    return data;
  });
  
  return <div>
    <h2>Xin chào {result.payload.data.name}</h2>
    <Profile />
  </div>;
}
