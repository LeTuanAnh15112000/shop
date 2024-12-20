import Profile from "@/app/me/profile";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequests/account";
import ProfileForm from "@/app/me/profile-form";

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  //Vì dùng cookie nên api này không được cached trên server
  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <div>
      <h2>Xin chào {result.payload.data.name}</h2>
      <ProfileForm profile={result.payload.data} />
    </div>
  );
}
