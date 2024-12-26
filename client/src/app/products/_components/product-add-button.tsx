'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import style from "../../app.module.scss";
import { isClient } from "@/lib/http";

export default function ProductAddButton() {
  const isAuthenticated = isClient && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) return null;
  return (
    <div className={style.products_add}>
      <Link href={"/products/add"}>
        <Button variant={"secondary"}>Thêm sản phẩm</Button>
      </Link>
    </div>
  );
}
