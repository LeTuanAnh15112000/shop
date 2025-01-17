"use client";
import authApiRequest from "@/apiRequests/auth";
import { useAppContext } from "@/app/app-provider";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function LogoutLogic() {
  const { setUser } = useAppContext();
  const router = useRouter();
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const sessionToken = searchParam.get("sessionToken");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === localStorage.getItem('sessionToken')) {
      authApiRequest
        .logoutFromNextClientToNextServer(true, signal)
        .then(() => {
          setUser(null)
          router.push(`/login?redirectForm=${pathName}`);
        })
        .catch((error) => {
          console.error("Logout failed:", error.message);
        });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, router, pathName, setUser]);
  return <div></div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}