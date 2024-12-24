"use client";
import authApiRequest from "@/apiRequests/auth";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParam = useSearchParams();
  const sessionToken = searchParam.get("sessionToken");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === clientSessionToken.value) {
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
