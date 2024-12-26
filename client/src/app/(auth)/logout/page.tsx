"use client";
import authApiRequest from "@/apiRequests/auth";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function LogoutLogic() {
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
          router.push(`/login?redirectForm=${pathName}`);
        })
        .catch((error) => {
          console.error("Logout failed:", error.message);
        });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, router, pathName]);
  return <div></div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}