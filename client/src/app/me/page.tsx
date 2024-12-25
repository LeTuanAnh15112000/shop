import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequests/account";
import ProfileForm from "@/app/me/profile-form";
import style from "@/app/app.module.scss"
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Hồ sơ người dùng',
}

export default async function MeProfile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  //Vì dùng cookie nên api này không được cached trên server
  const result = await accountApiRequest.me(sessionToken?.value ?? "");

  return (
    <div className={style.profile}>
      <h2 className={style.title}>Xin chào {result.payload.data.name}</h2>
      <ProfileForm profile={result.payload.data} />
    </div>
  );
}
