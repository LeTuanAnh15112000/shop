'use client'
import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import style from "./style.module.scss";
import { useAppContext } from "@/app/app-provider";

export default function Header() {
  const { user } = useAppContext();

  return (
    <div className={style.header}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/me">Profile</Link>
        </li>
        <li>
          <Link href="/products/">Sản phẩm</Link>
        </li>
      </ul>
      <ul>
        {user ? (
          ""
        ) : (
          <>
            <li>
              <Link href="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link href="/register">Đăng ký</Link>
            </li>
          </>
        )}
        {user ? (
          <li>
            <ButtonLogout />
          </li>
        ) : (
          ""
        )}
        <li>
          <Link href="/me">Xin chào {user?.name}</Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
}
