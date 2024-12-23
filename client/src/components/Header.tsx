import ButtonLogout from '@/components/button-logout'
import { ModeToggle } from '@/components/ModeToggle'
import Link from 'next/link'
import React from 'react'
import style from './style.module.scss'

export default function Header() {
  return (
    <div className={style.header}>
      <ul>
        <li><Link href="/products/">Sản phẩm</Link></li>
        <li><Link href="/login">Đăng nhập</Link></li>
        <li><Link href="/register">Đăng ký</Link></li>
        <li><ButtonLogout /></li>
      </ul>
      <ModeToggle />
    </div>
  )
}
