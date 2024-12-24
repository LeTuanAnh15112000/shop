import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import style from "./style.module.scss";
import { AccountResType } from "@/schemaValidations/account.schema";

export default async function Header({user}:{user: AccountResType['data'] | null}) {
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
        {user?.name ? (
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
        {user?.name ? (
          <li>
            <ButtonLogout />
          </li>
        ) : (
          ""
        )}
        <li><Link href="/me">Xin chào {user?.name}</Link></li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
}
