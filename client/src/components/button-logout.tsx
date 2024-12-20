"use client";
import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function ButtonLogout() {
  const router = useRouter();
  const pathName = usePathname()
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({error})
      authApiRequest
        .logoutFromNextClientToNextServer(true)
        .then(() => {
          router.push(`/login?redirectForm=${pathName}`);
        })
    }
  };
  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}
