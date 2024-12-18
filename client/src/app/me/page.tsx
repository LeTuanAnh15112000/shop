import Profile from "@/app/me/profile";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequests/account";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value ?? "")

  return (
    <div>
      <h2>Xin chào {result.payload.data.name}</h2>
      {/* <Profile /> */}
    </div>
  );
}
